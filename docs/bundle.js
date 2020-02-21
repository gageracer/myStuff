
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function validate_store(store, name) {
        if (!store || typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, callback) {
        const unsub = store.subscribe(callback);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function get_store_value(store) {
        let value;
        subscribe(store, _ => value = _)();
        return value;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, fn) {
        return definition[1]
            ? assign({}, assign(ctx.$$scope.ctx, definition[1](fn ? fn(ctx) : {})))
            : ctx.$$scope.ctx;
    }
    function get_slot_changes(definition, ctx, changed, fn) {
        return definition[1]
            ? assign({}, assign(ctx.$$scope.changed || {}, definition[1](fn ? fn(changed) : {})))
            : ctx.$$scope.changed || {};
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    let running = false;
    function run_tasks() {
        tasks.forEach(task => {
            if (!task[0](now())) {
                tasks.delete(task);
                task[1]();
            }
        });
        running = tasks.size > 0;
        if (running)
            raf(run_tasks);
    }
    function loop(fn) {
        let task;
        if (!running) {
            running = true;
            raf(run_tasks);
        }
        return {
            promise: new Promise(fulfil => {
                tasks.add(task = [fn, fulfil]);
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        if (value != null || input.value) {
            input.value = value;
        }
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let stylesheet;
    let active = 0;
    let current_rules = {};
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        if (!current_rules[name]) {
            if (!stylesheet) {
                const style = element('style');
                document.head.appendChild(style);
                stylesheet = style.sheet;
            }
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ``}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        node.style.animation = (node.style.animation || '')
            .split(', ')
            .filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        )
            .join(', ');
        if (name && !--active)
            clear_rules();
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            current_rules = {};
        });
    }

    function create_animation(node, from, fn, params) {
        if (!from)
            return noop;
        const to = node.getBoundingClientRect();
        if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
            return noop;
        const { delay = 0, duration = 300, easing = identity, 
        // @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
        start: start_time = now() + delay, 
        // @ts-ignore todo:
        end = start_time + duration, tick = noop, css } = fn(node, { from, to }, params);
        let running = true;
        let started = false;
        let name;
        function start() {
            if (css) {
                name = create_rule(node, 0, 1, duration, delay, easing, css);
            }
            if (!delay) {
                started = true;
            }
        }
        function stop() {
            if (css)
                delete_rule(node, name);
            running = false;
        }
        loop(now => {
            if (!started && now >= start_time) {
                started = true;
            }
            if (started && now >= end) {
                tick(1, 0);
                stop();
            }
            if (!running) {
                return false;
            }
            if (started) {
                const p = now - start_time;
                const t = 0 + 1 * easing(p / duration);
                tick(t, 1 - t);
            }
            return true;
        });
        start();
        tick(0, 1);
        return stop;
    }
    function fix_position(node) {
        const style = getComputedStyle(node);
        if (style.position !== 'absolute' && style.position !== 'fixed') {
            const { width, height } = style;
            const a = node.getBoundingClientRect();
            node.style.position = 'absolute';
            node.style.width = width;
            node.style.height = height;
            add_transform(node, a);
        }
    }
    function add_transform(node, a) {
        const b = node.getBoundingClientRect();
        if (a.left !== b.left || a.top !== b.top) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;
            node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
        }
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_update);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_out_transition(node, fn, params) {
        let config = fn(node, params);
        let running = true;
        let animation_name;
        const group = outros;
        group.r += 1;
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            add_render_callback(() => dispatch(node, false, 'start'));
            loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(0, 1);
                        dispatch(node, false, 'end');
                        if (!--group.r) {
                            // this will result in `end()` being called,
                            // so we don't need to clean up here
                            run_all(group.c);
                        }
                        return false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(1 - t, t);
                    }
                }
                return running;
            });
        }
        if (is_function(config)) {
            wait().then(() => {
                // @ts-ignore
                config = config();
                go();
            });
        }
        else {
            go();
        }
        return {
            end(reset) {
                if (reset && config.tick) {
                    config.tick(1, 0);
                }
                if (running) {
                    if (animation_name)
                        delete_rule(node, animation_name);
                    running = false;
                }
            }
        };
    }
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = program.b - t;
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    const globals = (typeof window !== 'undefined' ? window : global);
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function fix_and_outro_and_destroy_block(block, lookup) {
        block.f();
        outro_and_destroy_block(block, lookup);
    }
    function update_keyed_each(old_blocks, changed, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(changed, child_ctx);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        if (component.$$.fragment) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, ret, value = ret) => {
                if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
                return ret;
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_update);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, detail));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const mypage = writable("main");
    const myContainers = writable([]);
    const tmpCont = writable({id:"",name:"",type:"",items:[""]});
    const unSaved = writable({ id: "", name: "", type: "", items: [""] });

    function reLoad() {
        myContainers.set(getList("myStuff"));
        mypage.set(getLastPage("lastPage"));
        unSaved.set(getList("unSaved"));
        tmpCont.set(getList("tmpCont"));
    }

    // Editing any Container Function
    function editCont(name,type,items,id) {
        console.log("tmpContis: " + id);
        
        tmpCont.set({
            name: name,
            type: type,
            items: items,
            id: id
        });
        
        console.log(tmpCont);

    }
    function deleteContainer(oId){
        let x = get_store_value(myContainers).findIndex(x => x.id === oId);
        let tmpContainer = get_store_value(myContainers);
        tmpContainer.splice(x, 1);
        myContainers.update(() => tmpContainer);

        setList({ id: "", name: "", type: "", items: [""] }, "tmpCont");
        setList(get_store_value(myContainers), "myStuff");
    }

    function addContainer(nname, ntype, nitems, oId = ""){
        
        if(oId == ""){
            console.log("I am Creating new one");
            myContainers.update(existing => [...existing, {
                id: existing.length + Math.random(),
                name: nname,
                type: ntype,
                items: nitems
            }]

            );
            setList({ id: "", name: "", type: "", items: [""] }, "unSaved");
            
            
            
        }
        else{
            let x = get_store_value(myContainers).findIndex(x => x.id === oId);
            let tmpContainer = get_store_value(myContainers);
            tmpContainer.splice(x,1, {
                id: oId,
                name: nname,
                type: ntype,
                items: nitems});
            myContainers.update(() => tmpContainer);

            setList({ id: "", name: "", type: "", items: [""] }, "tmpCont");
        }
        
        setList(get_store_value(myContainers),"myStuff");
        
    }

    function toggle(msg) {
        setLastPage(msg);
        if (msg === "main") {
            mypage.set("main");
            reLoad();
            return;
        }
        if (msg === "newlist") {
            mypage.set("newlist");
            return;
        }
        if (msg === "editlist") {
            mypage.set("editlist");
            return;
        }


        mypage.set("newlist");
    }

    // These are set and get functions for the whole Containers list
    function setList(item,lsName) {
        console.log(item);
        localStorage.setItem(lsName, JSON.stringify(item));
    }

    function getList(str) {
        // console.log("inside getTODO: "+ str);
        if (localStorage.getItem(str)) { return JSON.parse(localStorage.getItem(str)); }
        else { 
            if(str === "myStuff") return new Array;
            if(str === "unSaved") return { id: "", name: "", type: "", items: [""] };
            if (str === "tmpCont") return { id: "", name: "", type: "", items: [""] };
            }
    }


    // These are set and get functions for the last visited page
    function getLastPage(str) {
        // console.log("inside getTODO: "+ str);
        if (localStorage.getItem(str)) { return JSON.parse(localStorage.getItem(str)); }
        else { return "main"; }
    }

    function setLastPage(str) {
        console.log(str);
        localStorage.setItem("lastPage", JSON.stringify(str));
    }

    /* src/Header.svelte generated by Svelte v3.12.1 */

    const file = "src/Header.svelte";

    function create_fragment(ctx) {
    	var button, dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "My_Stuff";
    			attr_dev(button, "id", "main_link");
    			attr_dev(button, "class", "svelte-1mvd3j6");
    			add_location(button, file, 22, 0, 378);
    			dispose = listen_dev(button, "click", ctx.click_handler);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(button);
    			}

    			dispose();
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance($$self) {
    	const click_handler = () => toggle('main');

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {};

    	return { click_handler };
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Header", options, id: create_fragment.name });
    	}
    }

    /* src/components/Modal.svelte generated by Svelte v3.12.1 */

    const file$1 = "src/components/Modal.svelte";

    function create_fragment$1(ctx) {
    	var div0, t0, div1, t1, t2, current;

    	const default_slot_template = ctx.$$slots.default;
    	const default_slot = create_slot(default_slot_template, ctx, null);

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			t1 = text(ctx.content);
    			t2 = space();

    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", "modal-bg svelte-zypfb8");
    			add_location(div0, file$1, 34, 0, 606);

    			attr_dev(div1, "class", "modal svelte-zypfb8");
    			add_location(div1, file$1, 36, 0, 636);
    		},

    		l: function claim(nodes) {
    			if (default_slot) default_slot.l(div1_nodes);
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t1);
    			append_dev(div1, t2);

    			if (default_slot) {
    				default_slot.m(div1, null);
    			}

    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (!current || changed.content) {
    				set_data_dev(t1, ctx.content);
    			}

    			if (default_slot && default_slot.p && changed.$$scope) {
    				default_slot.p(
    					get_slot_changes(default_slot_template, ctx, changed, null),
    					get_slot_context(default_slot_template, ctx, null)
    				);
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div0);
    				detach_dev(t0);
    				detach_dev(div1);
    			}

    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$1.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { content } = $$props;

    	const writable_props = ['content'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<Modal> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$props => {
    		if ('content' in $$props) $$invalidate('content', content = $$props.content);
    		if ('$$scope' in $$props) $$invalidate('$$scope', $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => {
    		return { content };
    	};

    	$$self.$inject_state = $$props => {
    		if ('content' in $$props) $$invalidate('content', content = $$props.content);
    	};

    	return { content, $$slots, $$scope };
    }

    class Modal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, ["content"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Modal", options, id: create_fragment$1.name });

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.content === undefined && !('content' in props)) {
    			console.warn("<Modal> was created without expected prop 'content'");
    		}
    	}

    	get content() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set content(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fade(node, { delay = 0, duration = 400 }) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            css: t => `opacity: ${t * o}`
        };
    }
    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 }) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
        };
    }

    function flip(node, animation, params) {
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        const dx = animation.from.left - animation.to.left;
        const dy = animation.from.top - animation.to.top;
        const d = Math.sqrt(dx * dx + dy * dy);
        const { delay = 0, duration = d => Math.sqrt(d) * 120, easing = cubicOut } = params;
        return {
            delay,
            duration: is_function(duration) ? duration(d) : duration,
            easing,
            css: (_t, u) => `transform: ${transform} translate(${u * dx}px, ${u * dy}px);`
        };
    }

    /* src/components/Create.svelte generated by Svelte v3.12.1 */
    const { console: console_1 } = globals;

    const file$2 = "src/components/Create.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.item = list[i];
    	child_ctx.each_value = list;
    	child_ctx.i = i;
    	return child_ctx;
    }

    // (150:16) {#if i != 0}
    function create_if_block_2(ctx) {
    	var button, dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "-";
    			attr_dev(button, "class", "svelte-1bsmocl");
    			add_location(button, file$2, 150, 16, 3875);
    			dispose = listen_dev(button, "click", ctx.remItem.bind(this,ctx.i));
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    		},

    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(button);
    			}

    			dispose();
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_if_block_2.name, type: "if", source: "(150:16) {#if i != 0}", ctx });
    	return block;
    }

    // (143:8) {#each items as item, i (i)}
    function create_each_block(key_1, ctx) {
    	var div, input, t0, t1, button, div_transition, rect, stop_animation = noop, current, dispose;

    	function input_input_handler() {
    		ctx.input_input_handler.call(input, ctx);
    	}

    	var if_block = (ctx.i != 0) && create_if_block_2(ctx);

    	function click_handler() {
    		return ctx.click_handler(ctx);
    	}

    	const block = {
    		key: key_1,

    		first: null,

    		c: function create() {
    			div = element("div");
    			input = element("input");
    			t0 = space();
    			if (if_block) if_block.c();
    			t1 = space();
    			button = element("button");
    			button.textContent = "+";
    			attr_dev(input, "type", "text");
    			attr_dev(input, "name", "tmpitems");
    			attr_dev(input, "autocomplete", "off");
    			attr_dev(input, "maxlength", "16");
    			attr_dev(input, "placeholder", ctx.inputMsg);
    			input.required = true;
    			attr_dev(input, "class", "svelte-1bsmocl");
    			add_location(input, file$2, 147, 16, 3689);
    			attr_dev(button, "class", "svelte-1bsmocl");
    			add_location(button, file$2, 152, 16, 3964);
    			attr_dev(div, "class", "itemslist svelte-1bsmocl");
    			add_location(div, file$2, 143, 12, 3541);

    			dispose = [
    				listen_dev(input, "input", input_input_handler),
    				listen_dev(button, "click", click_handler)
    			];

    			this.first = div;
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, input);

    			set_input_value(input, ctx.item);

    			append_dev(div, t0);
    			if (if_block) if_block.m(div, null);
    			append_dev(div, t1);
    			append_dev(div, button);
    			current = true;
    		},

    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if (changed.items && (input.value !== ctx.item)) set_input_value(input, ctx.item);

    			if (!current || changed.inputMsg) {
    				attr_dev(input, "placeholder", ctx.inputMsg);
    			}

    			if (ctx.i != 0) {
    				if (if_block) {
    					if_block.p(changed, ctx);
    				} else {
    					if_block = create_if_block_2(ctx);
    					if_block.c();
    					if_block.m(div, t1);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},

    		r: function measure_1() {
    			rect = div.getBoundingClientRect();
    		},

    		f: function fix() {
    			fix_position(div);
    			stop_animation();
    			add_transform(div, rect);
    		},

    		a: function animate() {
    			stop_animation();
    			stop_animation = create_animation(div, rect, flip, {key: ctx.i});
    		},

    		i: function intro(local) {
    			if (current) return;
    			add_render_callback(() => {
    				if (!div_transition) div_transition = create_bidirectional_transition(div, fade, {key: ctx.i}, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},

    		o: function outro(local) {
    			if (!div_transition) div_transition = create_bidirectional_transition(div, fade, {key: ctx.i}, false);
    			div_transition.run(0);

    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}

    			if (if_block) if_block.d();

    			if (detaching) {
    				if (div_transition) div_transition.end();
    			}

    			run_all(dispose);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_each_block.name, type: "each", source: "(143:8) {#each items as item, i (i)}", ctx });
    	return block;
    }

    // (157:12) {#if editt}
    function create_if_block_1(ctx) {
    	var button, dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "Delete";
    			set_style(button, "color", "red");
    			set_style(button, "background-color", "#f5f5f6");
    			attr_dev(button, "class", "svelte-1bsmocl");
    			add_location(button, file$2, 157, 12, 4118);
    			dispose = listen_dev(button, "click", ctx.click_handler_1);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(button);
    			}

    			dispose();
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_if_block_1.name, type: "if", source: "(157:12) {#if editt}", ctx });
    	return block;
    }

    // (166:0) {#if delModal}
    function create_if_block(ctx) {
    	var current;

    	var modal = new Modal({
    		props: {
    		content: "Are you sure you wanna delete this container?",
    		$$slots: { default: [create_default_slot] },
    		$$scope: { ctx }
    	},
    		$$inline: true
    	});

    	const block = {
    		c: function create() {
    			modal.$$.fragment.c();
    		},

    		m: function mount(target, anchor) {
    			mount_component(modal, target, anchor);
    			current = true;
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(modal.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(modal.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(modal, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_if_block.name, type: "if", source: "(166:0) {#if delModal}", ctx });
    	return block;
    }

    // (167:4) <Modal content="Are you sure you wanna delete this container?">
    function create_default_slot(ctx) {
    	var div, button0, t_1, button1, dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button0 = element("button");
    			button0.textContent = "Yes";
    			t_1 = space();
    			button1 = element("button");
    			button1.textContent = "No";
    			set_style(button0, "background-color", "red");
    			attr_dev(button0, "class", "svelte-1bsmocl");
    			add_location(button0, file$2, 168, 12, 4483);
    			attr_dev(button1, "class", "svelte-1bsmocl");
    			add_location(button1, file$2, 169, 12, 4576);
    			attr_dev(div, "class", "row-buttons svelte-1bsmocl");
    			add_location(div, file$2, 167, 8, 4445);

    			dispose = [
    				listen_dev(button0, "click", ctx.deleteSubmit, { once: true }),
    				listen_dev(button1, "click", ctx.click_handler_2)
    			];
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button0);
    			append_dev(div, t_1);
    			append_dev(div, button1);
    		},

    		p: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}

    			run_all(dispose);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_default_slot.name, type: "slot", source: "(167:4) <Modal content=\"Are you sure you wanna delete this container?\">", ctx });
    	return block;
    }

    function create_fragment$2(ctx) {
    	var div1, label, input0, t0, input1, t1, each_blocks = [], each_1_lookup = new Map(), t2, div0, t3, button, div1_intro, div1_outro, t5, if_block1_anchor, current, dispose;

    	let each_value = ctx.items;

    	const get_key = ctx => ctx.i;

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	var if_block0 = (ctx.editt) && create_if_block_1(ctx);

    	var if_block1 = (ctx.delModal) && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			label = element("label");
    			input0 = element("input");
    			t0 = space();
    			input1 = element("input");
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			div0 = element("div");
    			if (if_block0) if_block0.c();
    			t3 = space();
    			button = element("button");
    			button.textContent = "Save";
    			t5 = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    			input0.autofocus = true;
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "name", "name");
    			attr_dev(input0, "autocomplete", "off");
    			attr_dev(input0, "maxlength", "16");
    			attr_dev(input0, "placeholder", "The Container Name");
    			input0.required = true;
    			attr_dev(input0, "class", "svelte-1bsmocl");
    			add_location(input0, file$2, 137, 8, 3189);
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "name", "type");
    			attr_dev(input1, "autocomplete", "off");
    			attr_dev(input1, "maxlength", "16");
    			attr_dev(input1, "placeholder", "The Container Type");
    			input1.required = true;
    			attr_dev(input1, "class", "svelte-1bsmocl");
    			add_location(input1, file$2, 139, 8, 3346);
    			attr_dev(button, "class", "svelte-1bsmocl");
    			add_location(button, file$2, 159, 12, 4254);
    			attr_dev(div0, "class", "buttons svelte-1bsmocl");
    			add_location(div0, file$2, 155, 8, 4060);
    			attr_dev(label, "class", "svelte-1bsmocl");
    			add_location(label, file$2, 136, 4, 3173);
    			attr_dev(div1, "classname", "create-new");
    			attr_dev(div1, "class", "svelte-1bsmocl");
    			add_location(div1, file$2, 135, 0, 3082);

    			dispose = [
    				listen_dev(input0, "input", ctx.input0_input_handler),
    				listen_dev(input1, "input", ctx.input1_input_handler),
    				listen_dev(button, "click", ctx.handleSubmit, { once: true })
    			];
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, label);
    			append_dev(label, input0);

    			set_input_value(input0, ctx.name);

    			append_dev(label, t0);
    			append_dev(label, input1);

    			set_input_value(input1, ctx.type);

    			append_dev(label, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(label, null);
    			}

    			append_dev(label, t2);
    			append_dev(label, div0);
    			if (if_block0) if_block0.m(div0, null);
    			append_dev(div0, t3);
    			append_dev(div0, button);
    			insert_dev(target, t5, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    			input0.focus();
    		},

    		p: function update(changed, ctx) {
    			if (changed.name && (input0.value !== ctx.name)) set_input_value(input0, ctx.name);
    			if (changed.type && (input1.value !== ctx.type)) set_input_value(input1, ctx.type);

    			const each_value = ctx.items;

    			group_outros();
    			for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].r();
    			each_blocks = update_keyed_each(each_blocks, changed, get_key, 1, ctx, each_value, each_1_lookup, label, fix_and_outro_and_destroy_block, create_each_block, t2, get_each_context);
    			for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].a();
    			check_outros();

    			if (ctx.editt) {
    				if (!if_block0) {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					if_block0.m(div0, t3);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (ctx.delModal) {
    				if (!if_block1) {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				} else transition_in(if_block1, 1);
    			} else if (if_block1) {
    				group_outros();
    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});
    				check_outros();
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			add_render_callback(() => {
    				if (div1_outro) div1_outro.end(1);
    				if (!div1_intro) div1_intro = create_in_transition(div1, fade, { duration: 1000 });
    				div1_intro.start();
    			});

    			transition_in(if_block1);
    			current = true;
    		},

    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			if (div1_intro) div1_intro.invalidate();

    			div1_outro = create_out_transition(div1, fade, {duration: 0});

    			transition_out(if_block1);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div1);
    			}

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			if (if_block0) if_block0.d();

    			if (detaching) {
    				if (div1_outro) div1_outro.end();
    				detach_dev(t5);
    			}

    			if (if_block1) if_block1.d(detaching);

    			if (detaching) {
    				detach_dev(if_block1_anchor);
    			}

    			run_all(dispose);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$2.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	

        let { id = "", name = "", type = "", items = [""], editt = false } = $$props;

        let delModal = false;

        let inputMsg = "Start adding items to your container!";

        function handleSubmit(){
            if(name && type && items) {
                $$invalidate('items', items = items.filter(Boolean));
                addContainer(name, type, items, id);

                console.log("handleSubmitted");
                toggle("main");
            }
            
        }

        function deleteSubmit(){
            deleteContainer(id);
            toggle("main");
        }

        function newItem(itm){
            if(items[items.length-1] !== ""){
                $$invalidate('items', items[items.length - 1] = itm, items);
                $$invalidate('items', items = [...items, ""]);
            }
        }

        function remItem(index) {
            console.log(index+ " th item deleted");
            $$invalidate('items', items = items.filter((i,idx) => { return idx !== index;}));
        }

    	const writable_props = ['id', 'name', 'type', 'items', 'editt'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console_1.warn(`<Create> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		name = this.value;
    		$$invalidate('name', name);
    	}

    	function input1_input_handler() {
    		type = this.value;
    		$$invalidate('type', type);
    	}

    	function input_input_handler({ item, each_value, i }) {
    		each_value[i] = this.value;
    		$$invalidate('items', items);
    	}

    	const click_handler = ({ item }) => newItem(item);

    	const click_handler_1 = () => $$invalidate('delModal', delModal = true);

    	const click_handler_2 = () => $$invalidate('delModal', delModal = false);

    	$$self.$set = $$props => {
    		if ('id' in $$props) $$invalidate('id', id = $$props.id);
    		if ('name' in $$props) $$invalidate('name', name = $$props.name);
    		if ('type' in $$props) $$invalidate('type', type = $$props.type);
    		if ('items' in $$props) $$invalidate('items', items = $$props.items);
    		if ('editt' in $$props) $$invalidate('editt', editt = $$props.editt);
    	};

    	$$self.$capture_state = () => {
    		return { id, name, type, items, editt, delModal, inputMsg };
    	};

    	$$self.$inject_state = $$props => {
    		if ('id' in $$props) $$invalidate('id', id = $$props.id);
    		if ('name' in $$props) $$invalidate('name', name = $$props.name);
    		if ('type' in $$props) $$invalidate('type', type = $$props.type);
    		if ('items' in $$props) $$invalidate('items', items = $$props.items);
    		if ('editt' in $$props) $$invalidate('editt', editt = $$props.editt);
    		if ('delModal' in $$props) $$invalidate('delModal', delModal = $$props.delModal);
    		if ('inputMsg' in $$props) $$invalidate('inputMsg', inputMsg = $$props.inputMsg);
    	};

    	$$self.$$.update = ($$dirty = { items: 1, name: 1, type: 1, editt: 1 }) => {
    		if ($$dirty.items) { if(items.length > 1){ $$invalidate('inputMsg', inputMsg= "And another one");} }
    		if ($$dirty.name || $$dirty.type || $$dirty.items || $$dirty.editt) { {
                    console.log(name+ ':'+type+':'+items);
                    
                    editt? setList({ name: name, type: type, items: items }, "tmpCont") 
                    :setList({name: name, type: type, items: items},"unSaved");
                } }
    		if ($$dirty.items) { {
                    console.log(items.length+" items:"+items);
                } }
    	};

    	return {
    		id,
    		name,
    		type,
    		items,
    		editt,
    		delModal,
    		inputMsg,
    		handleSubmit,
    		deleteSubmit,
    		newItem,
    		remItem,
    		input0_input_handler,
    		input1_input_handler,
    		input_input_handler,
    		click_handler,
    		click_handler_1,
    		click_handler_2
    	};
    }

    class Create extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, ["id", "name", "type", "items", "editt"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Create", options, id: create_fragment$2.name });
    	}

    	get id() {
    		throw new Error("<Create>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Create>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Create>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Create>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Create>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Create>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get items() {
    		throw new Error("<Create>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<Create>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get editt() {
    		throw new Error("<Create>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set editt(value) {
    		throw new Error("<Create>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/NewButton.svelte generated by Svelte v3.12.1 */

    const file$3 = "src/components/NewButton.svelte";

    // (44:32) 
    function create_if_block_1$1(ctx) {
    	const block = {
    		c: noop,
    		m: noop,
    		d: noop
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_if_block_1$1.name, type: "if", source: "(44:32) ", ctx });
    	return block;
    }

    // (42:0) {#if button === 'newlist'}
    function create_if_block$1(ctx) {
    	var button_1, span, dispose;

    	const block = {
    		c: function create() {
    			button_1 = element("button");
    			span = element("span");
    			span.textContent = "+";
    			add_location(span, file$3, 42, 66, 934);
    			attr_dev(button_1, "id", "menu-edit-create");
    			attr_dev(button_1, "class", "svelte-1yri8rm");
    			add_location(button_1, file$3, 42, 0, 868);
    			dispose = listen_dev(button_1, "click", ctx.click_handler);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, button_1, anchor);
    			append_dev(button_1, span);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(button_1);
    			}

    			dispose();
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_if_block$1.name, type: "if", source: "(42:0) {#if button === 'newlist'}", ctx });
    	return block;
    }

    function create_fragment$3(ctx) {
    	var if_block_anchor;

    	function select_block_type(changed, ctx) {
    		if (ctx.button === 'newlist') return create_if_block$1;
    		if (ctx.button === 'editlist') return create_if_block_1$1;
    	}

    	var current_block_type = select_block_type(null, ctx);
    	var if_block = current_block_type && current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},

    		p: function update(changed, ctx) {
    			if (current_block_type !== (current_block_type = select_block_type(changed, ctx))) {
    				if (if_block) if_block.d(1);
    				if_block = current_block_type && current_block_type(ctx);
    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);

    			if (detaching) {
    				detach_dev(if_block_anchor);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$3.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { button } = $$props;

    	const writable_props = ['button'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<NewButton> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => toggle(button);

    	$$self.$set = $$props => {
    		if ('button' in $$props) $$invalidate('button', button = $$props.button);
    	};

    	$$self.$capture_state = () => {
    		return { button };
    	};

    	$$self.$inject_state = $$props => {
    		if ('button' in $$props) $$invalidate('button', button = $$props.button);
    	};

    	return { button, click_handler };
    }

    class NewButton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, ["button"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "NewButton", options, id: create_fragment$3.name });

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.button === undefined && !('button' in props)) {
    			console.warn("<NewButton> was created without expected prop 'button'");
    		}
    	}

    	get button() {
    		throw new Error("<NewButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set button(value) {
    		throw new Error("<NewButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Container.svelte generated by Svelte v3.12.1 */
    const { console: console_1$1 } = globals;

    const file$4 = "src/components/Container.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.item = list[i];
    	child_ctx.i = i;
    	return child_ctx;
    }

    // (85:8) {#if !isSum}
    function create_if_block$2(ctx) {
    	var div, t0, t1, t2, t3, t4, ul, t5, button, div_transition, current, dispose;

    	let each_value = ctx.items;

    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text("Type: ");
    			t1 = text(ctx.type);
    			t2 = text(" |\n            ");
    			t3 = text(ctx.itemsnum);
    			t4 = text(" Stuff here\n            ");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t5 = space();
    			button = element("button");
    			button.textContent = "Edit";
    			attr_dev(ul, "class", "item-list svelte-ipg51r");
    			add_location(ul, file$4, 91, 12, 2223);
    			attr_dev(button, "class", "edit-button svelte-ipg51r");
    			add_location(button, file$4, 96, 12, 2376);
    			attr_dev(div, "class", "details svelte-ipg51r");
    			add_location(div, file$4, 85, 8, 2047);
    			dispose = listen_dev(button, "click", ctx.editHandle);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			append_dev(div, t2);
    			append_dev(div, t3);
    			append_dev(div, t4);
    			append_dev(div, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			append_dev(div, t5);
    			append_dev(div, button);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (!current || changed.type) {
    				set_data_dev(t1, ctx.type);
    			}

    			if (changed.items) {
    				each_value = ctx.items;

    				let i;
    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}
    				each_blocks.length = each_value.length;
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			add_render_callback(() => {
    				if (!div_transition) div_transition = create_bidirectional_transition(div, fly, { y: -200, duration: 100 }, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},

    		o: function outro(local) {
    			if (!div_transition) div_transition = create_bidirectional_transition(div, fly, { y: -200, duration: 100 }, false);
    			div_transition.run(0);

    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}

    			destroy_each(each_blocks, detaching);

    			if (detaching) {
    				if (div_transition) div_transition.end();
    			}

    			dispose();
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_if_block$2.name, type: "if", source: "(85:8) {#if !isSum}", ctx });
    	return block;
    }

    // (93:16) {#each items as item,i}
    function create_each_block$1(ctx) {
    	var li, t_value = ctx.item + "", t;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text(t_value);
    			add_location(li, file$4, 93, 20, 2306);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);
    		},

    		p: function update(changed, ctx) {
    			if ((changed.items) && t_value !== (t_value = ctx.item + "")) {
    				set_data_dev(t, t_value);
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(li);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_each_block$1.name, type: "each", source: "(93:16) {#each items as item,i}", ctx });
    	return block;
    }

    function create_fragment$4(ctx) {
    	var div1, div0, t0, t1, hr, t2, div1_intro, div1_outro, current, dispose;

    	var if_block = (!ctx.isSum) && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text(ctx.name);
    			t1 = space();
    			hr = element("hr");
    			t2 = space();
    			if (if_block) if_block.c();
    			attr_dev(div0, "id", "name");
    			attr_dev(div0, "class", "svelte-ipg51r");
    			add_location(div0, file$4, 78, 8, 1890);
    			set_style(hr, "width", "90%");
    			set_style(hr, "border-color", "#e1e2e186");
    			add_location(hr, file$4, 81, 8, 1948);
    			attr_dev(div1, "class", "containersum svelte-ipg51r");
    			add_location(div1, file$4, 76, 4, 1776);
    			dispose = listen_dev(div1, "click", ctx.details);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div1, t1);
    			append_dev(div1, hr);
    			append_dev(div1, t2);
    			if (if_block) if_block.m(div1, null);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (!current || changed.name) {
    				set_data_dev(t0, ctx.name);
    			}

    			if (!ctx.isSum) {
    				if (if_block) {
    					if_block.p(changed, ctx);
    					transition_in(if_block, 1);
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div1, null);
    				}
    			} else if (if_block) {
    				group_outros();
    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});
    				check_outros();
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);

    			add_render_callback(() => {
    				if (div1_outro) div1_outro.end(1);
    				if (!div1_intro) div1_intro = create_in_transition(div1, fade, { duration: 500 });
    				div1_intro.start();
    			});

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(if_block);
    			if (div1_intro) div1_intro.invalidate();

    			div1_outro = create_out_transition(div1, fade, {duration: 0});

    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div1);
    			}

    			if (if_block) if_block.d();

    			if (detaching) {
    				if (div1_outro) div1_outro.end();
    			}

    			dispose();
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$4.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	

        let { id = "", name = "TestName", type = "TestType", items = ["sugar"] } = $$props;
        let itemsnum = items.length;

        let { isSum = true } = $$props;

        function editHandle() {
                
            editCont(name, type, items, id);
            toggle("editlist");
            console.log("handleSubmitted by editCont");
                
        
        }

        function details() {
                $$invalidate('isSum', isSum = !isSum);
        }

    	const writable_props = ['id', 'name', 'type', 'items', 'isSum'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console_1$1.warn(`<Container> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('id' in $$props) $$invalidate('id', id = $$props.id);
    		if ('name' in $$props) $$invalidate('name', name = $$props.name);
    		if ('type' in $$props) $$invalidate('type', type = $$props.type);
    		if ('items' in $$props) $$invalidate('items', items = $$props.items);
    		if ('isSum' in $$props) $$invalidate('isSum', isSum = $$props.isSum);
    	};

    	$$self.$capture_state = () => {
    		return { id, name, type, items, itemsnum, isSum };
    	};

    	$$self.$inject_state = $$props => {
    		if ('id' in $$props) $$invalidate('id', id = $$props.id);
    		if ('name' in $$props) $$invalidate('name', name = $$props.name);
    		if ('type' in $$props) $$invalidate('type', type = $$props.type);
    		if ('items' in $$props) $$invalidate('items', items = $$props.items);
    		if ('itemsnum' in $$props) $$invalidate('itemsnum', itemsnum = $$props.itemsnum);
    		if ('isSum' in $$props) $$invalidate('isSum', isSum = $$props.isSum);
    	};

    	return {
    		id,
    		name,
    		type,
    		items,
    		itemsnum,
    		isSum,
    		editHandle,
    		details
    	};
    }

    class Container extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, ["id", "name", "type", "items", "isSum", "editHandle"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Container", options, id: create_fragment$4.name });

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.editHandle === undefined && !('editHandle' in props)) {
    			console_1$1.warn("<Container> was created without expected prop 'editHandle'");
    		}
    	}

    	get id() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get items() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isSum() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isSum(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get editHandle() {
    		return this.$$.ctx.editHandle;
    	}

    	set editHandle(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/ContainerSum.svelte generated by Svelte v3.12.1 */

    const file$5 = "src/components/ContainerSum.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.container = list[i];
    	child_ctx.i = i;
    	return child_ctx;
    }

    // (15:4) {:else}
    function create_else_block(ctx) {
    	var t0, br, t1;

    	const block = {
    		c: function create() {
    			t0 = text("Welcome to MyStuff! Start adding Containers to the app using the plus button so you\n        can keep track of stuff you have, even when you forgot the app remembers!\n        ");
    			br = element("br");
    			t1 = text("\n        This app saves all data to your local store so all your data is on your device.");
    			add_location(br, file$5, 17, 8, 555);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, br, anchor);
    			insert_dev(target, t1, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(t0);
    				detach_dev(br);
    				detach_dev(t1);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_else_block.name, type: "else", source: "(15:4) {:else}", ctx });
    	return block;
    }

    // (10:4) {#each get(myContainers) as container, i (container.id)}
    function create_each_block$2(key_1, ctx) {
    	var first, current;

    	var container_spread_levels = [
    		ctx.container
    	];

    	let container_props = {};
    	for (var i_1 = 0; i_1 < container_spread_levels.length; i_1 += 1) {
    		container_props = assign(container_props, container_spread_levels[i_1]);
    	}
    	var container = new Container({ props: container_props, $$inline: true });

    	const block = {
    		key: key_1,

    		first: null,

    		c: function create() {
    			first = empty();
    			container.$$.fragment.c();
    			this.first = first;
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(container, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var container_changes = (changed.get || changed.myContainers) ? get_spread_update(container_spread_levels, [
    									get_spread_object(ctx.container)
    								]) : {};
    			container.$set(container_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(container.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(container.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(first);
    			}

    			destroy_component(container, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_each_block$2.name, type: "each", source: "(10:4) {#each get(myContainers) as container, i (container.id)}", ctx });
    	return block;
    }

    function create_fragment$5(ctx) {
    	var each_blocks = [], each_1_lookup = new Map(), each_1_anchor, current;

    	let each_value = get_store_value(myContainers);

    	const get_key = ctx => ctx.container.id;

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$2(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
    	}

    	let each_1_else = null;

    	if (!each_value.length) {
    		each_1_else = create_else_block(ctx);
    		each_1_else.c();
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);

    			if (each_1_else) {
    				each_1_else.m(target, anchor);
    			}

    			current = true;
    		},

    		p: function update(changed, ctx) {
    			const each_value = get_store_value(myContainers);

    			group_outros();
    			each_blocks = update_keyed_each(each_blocks, changed, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block$2, each_1_anchor, get_each_context$2);
    			check_outros();

    			if (each_value.length) {
    				if (each_1_else) {
    					each_1_else.d(1);
    					each_1_else = null;
    				}
    			} else if (!each_1_else) {
    				each_1_else = create_else_block(ctx);
    				each_1_else.c();
    				each_1_else.m(each_1_anchor.parentNode, each_1_anchor);
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},

    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},

    		d: function destroy(detaching) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d(detaching);
    			}

    			if (detaching) {
    				detach_dev(each_1_anchor);
    			}

    			if (each_1_else) each_1_else.d(detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$5.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$5($$self) {
    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {};

    	console.log("myContainers list has: ", get_store_value(myContainers));

    	return {};
    }

    class ContainerSum extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "ContainerSum", options, id: create_fragment$5.name });
    	}
    }

    /* src/CurrentPage.svelte generated by Svelte v3.12.1 */

    // (31:0) {:else}
    function create_else_block$1(ctx) {
    	var t, current;

    	var containersum = new ContainerSum({ $$inline: true });

    	var newbutton = new NewButton({
    		props: { button: "newlist" },
    		$$inline: true
    	});

    	const block = {
    		c: function create() {
    			containersum.$$.fragment.c();
    			t = space();
    			newbutton.$$.fragment.c();
    		},

    		m: function mount(target, anchor) {
    			mount_component(containersum, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(newbutton, target, anchor);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			transition_in(containersum.$$.fragment, local);

    			transition_in(newbutton.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(containersum.$$.fragment, local);
    			transition_out(newbutton.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(containersum, detaching);

    			if (detaching) {
    				detach_dev(t);
    			}

    			destroy_component(newbutton, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_else_block$1.name, type: "else", source: "(31:0) {:else}", ctx });
    	return block;
    }

    // (22:33) 
    function create_if_block_1$2(ctx) {
    	var current;

    	var create = new Create({
    		props: {
    		name: ctx.$tmpCont.name,
    		type: ctx.$tmpCont.type,
    		items: ctx.$tmpCont.items,
    		id: ctx.$tmpCont.id,
    		editt: true
    	},
    		$$inline: true
    	});

    	const block = {
    		c: function create_1() {
    			create.$$.fragment.c();
    		},

    		m: function mount(target, anchor) {
    			mount_component(create, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var create_changes = {};
    			if (changed.$tmpCont) create_changes.name = ctx.$tmpCont.name;
    			if (changed.$tmpCont) create_changes.type = ctx.$tmpCont.type;
    			if (changed.$tmpCont) create_changes.items = ctx.$tmpCont.items;
    			if (changed.$tmpCont) create_changes.id = ctx.$tmpCont.id;
    			create.$set(create_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(create.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(create.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(create, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_if_block_1$2.name, type: "if", source: "(22:33) ", ctx });
    	return block;
    }

    // (13:0) {#if $mypage === "newlist"}
    function create_if_block$3(ctx) {
    	var current;

    	var create = new Create({
    		props: {
    		name: ctx.$unSaved.name,
    		type: ctx.$unSaved.type,
    		items: ctx.$unSaved.items,
    		editt: false
    	},
    		$$inline: true
    	});

    	const block = {
    		c: function create_1() {
    			create.$$.fragment.c();
    		},

    		m: function mount(target, anchor) {
    			mount_component(create, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var create_changes = {};
    			if (changed.$unSaved) create_changes.name = ctx.$unSaved.name;
    			if (changed.$unSaved) create_changes.type = ctx.$unSaved.type;
    			if (changed.$unSaved) create_changes.items = ctx.$unSaved.items;
    			create.$set(create_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(create.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(create.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(create, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_if_block$3.name, type: "if", source: "(13:0) {#if $mypage === \"newlist\"}", ctx });
    	return block;
    }

    function create_fragment$6(ctx) {
    	var current_block_type_index, if_block, if_block_anchor, current;

    	var if_block_creators = [
    		create_if_block$3,
    		create_if_block_1$2,
    		create_else_block$1
    	];

    	var if_blocks = [];

    	function select_block_type(changed, ctx) {
    		if (ctx.$mypage === "newlist") return 0;
    		if (ctx.$mypage === "editlist") return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type(null, ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(changed, ctx);
    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(changed, ctx);
    			} else {
    				group_outros();
    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});
    				check_outros();

    				if_block = if_blocks[current_block_type_index];
    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}
    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);

    			if (detaching) {
    				detach_dev(if_block_anchor);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$6.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let $mypage, $unSaved, $tmpCont;

    	validate_store(mypage, 'mypage');
    	component_subscribe($$self, mypage, $$value => { $mypage = $$value; $$invalidate('$mypage', $mypage); });
    	validate_store(unSaved, 'unSaved');
    	component_subscribe($$self, unSaved, $$value => { $unSaved = $$value; $$invalidate('$unSaved', $unSaved); });
    	validate_store(tmpCont, 'tmpCont');
    	component_subscribe($$self, tmpCont, $$value => { $tmpCont = $$value; $$invalidate('$tmpCont', $tmpCont); });

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ('$mypage' in $$props) mypage.set($mypage);
    		if ('$unSaved' in $$props) unSaved.set($unSaved);
    		if ('$tmpCont' in $$props) tmpCont.set($tmpCont);
    	};

    	$$self.$$.update = ($$dirty = { $mypage: 1 }) => {
    		if ($$dirty.$mypage) { console.log("Current page is: " + $mypage); }
    	};

    	return { $mypage, $unSaved, $tmpCont };
    }

    class CurrentPage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "CurrentPage", options, id: create_fragment$6.name });
    	}
    }

    /* src/App.svelte generated by Svelte v3.12.1 */

    const file$6 = "src/App.svelte";

    function create_fragment$7(ctx) {
    	var main, t, current;

    	var header = new Header({ $$inline: true });

    	var currentpage = new CurrentPage({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			header.$$.fragment.c();
    			t = space();
    			currentpage.$$.fragment.c();
    			attr_dev(main, "class", "svelte-1og9k99");
    			add_location(main, file$6, 25, 0, 452);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(header, main, null);
    			append_dev(main, t);
    			mount_component(currentpage, main, null);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);

    			transition_in(currentpage.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(currentpage.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(main);
    			}

    			destroy_component(header);

    			destroy_component(currentpage);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$7.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$7($$self) {
    	
    	
    	reLoad();

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {};

    	return {};
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "App", options, id: create_fragment$7.name });
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
