
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
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
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
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
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function null_to_empty(value) {
    return value == null ? '' : value;
}

const is_client = typeof window !== 'undefined';
let now = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
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
    else if (node.getAttribute(attribute) !== value)
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
// unfortunately this can't be a constant as that wouldn't be tree-shakeable
// so we cache the result instead
let crossorigin;
function is_crossorigin() {
    if (crossorigin === undefined) {
        crossorigin = false;
        try {
            if (typeof window !== 'undefined' && window.parent) {
                void window.parent.document;
            }
        }
        catch (error) {
            crossorigin = true;
        }
    }
    return crossorigin;
}
function add_resize_listener(node, fn) {
    const computed_style = getComputedStyle(node);
    const z_index = (parseInt(computed_style.zIndex) || 0) - 1;
    if (computed_style.position === 'static') {
        node.style.position = 'relative';
    }
    const iframe = element('iframe');
    iframe.setAttribute('style', `display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ` +
        `overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: ${z_index};`);
    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;
    let unsubscribe;
    if (is_crossorigin()) {
        iframe.src = `data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>`;
        unsubscribe = listen(window, 'message', (event) => {
            if (event.source === iframe.contentWindow)
                fn();
        });
    }
    else {
        iframe.src = 'about:blank';
        iframe.onload = () => {
            unsubscribe = listen(iframe.contentWindow, 'resize', fn);
        };
    }
    append(node, iframe);
    return () => {
        detach(iframe);
        if (unsubscribe)
            unsubscribe();
    };
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}

const active_docs = new Set();
let active = 0;
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
    const doc = node.ownerDocument;
    active_docs.add(doc);
    const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
    const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
    if (!current_rules[name]) {
        current_rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ``}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active)
            clear_rules();
    }
}
function clear_rules() {
    raf(() => {
        if (active)
            return;
        active_docs.forEach(doc => {
            const stylesheet = doc.__svelte_stylesheet;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            doc.__svelte_rules = {};
        });
        active_docs.clear();
    });
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error(`Function called outside component initialization`);
    return current_component;
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
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
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
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

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);
function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
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
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next, lookup.has(block.key));
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
function validate_each_keys(ctx, list, get_context, get_key) {
    const keys = new Set();
    for (let i = 0; i < list.length; i++) {
        const key = get_key(get_context(ctx, list, i));
        if (keys.has(key)) {
            throw new Error(`Cannot have duplicate keys in a keyed each`);
        }
        keys.add(key);
    }
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
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
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
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const prop_values = options.props || {};
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
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
        dirty
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, prop_values, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if ($$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
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
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.21.0' }, detail)));
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
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
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
    $capture_state() { }
    $inject_state() { }
}

const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */
function readable(value, start) {
    return {
        subscribe: writable(value, start).subscribe,
    };
}
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

// These are set and get functions for the whole Containers list
function setList(item, lsName) {
    // console.log(lsName," ----------------------->",item);
    localStorage.setItem(lsName, JSON.stringify(item));
}

function getList(str) {
    // console.log("inside getTODO: "+ str);
    if (localStorage.getItem(str)) return JSON.parse(localStorage.getItem(str));
    else {
        if (str === "myVersion") return "0";
        if (str === "myStuff") return new Array;
        if (str === "totalContainers") return new Array;
        if (str === "unSaved") return { id: "", name: "", type: "", items: [["",false]] };
        if (str === "tmpCont") return { id: "", name: "", type: "", items: [["", false]] };
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

const version = readable("0.608a");

const mypage = writable("main");
const myContainers = writable([]);
const tmpCont = writable({ id: "", name: "", type: "", items: [["", false]]});
const unSaved = writable({ id: "", name: "", type: "", items: [["", false]]});

function reLoad() {
    if(get_store_value(myContainers).length == 0){
        verUpdate1(getList("myVersion"));
    }
    myContainers.set(getList("myStuff"));
    mypage.set(getLastPage("lastPage"));
    unSaved.set(getList("unSaved"));
    tmpCont.set(getList("tmpCont"));

}

function verUpdate1(localver) {
    // THIS IS WHERE YOU WILL MODIFY THE LOCAL STORAGE DATA MYSTUFF AND SAVE IT
    let localCont = getList("myStuff");
    if (localver < "0.513a" && localCont.length !== 0 ) {
        console.log("version is old ", localver, "... gonna do stuff");
        let temp;
        typeof (localCont[0].items[0][1]) !== "boolean" && (
            
            temp = localCont.map(ele => [{
            id: ele.id,
            name: ele.name,
            type: ele.type,
            items: ele.items.map(x => [x, false]),
            interact: false
            }]
            )
        );
        myContainers.update(() => temp);
        console.log("temp is---------------------------->",get_store_value(myContainers));
        setList(get_store_value(myContainers), "myStuff");
        setList(get_store_value(version), "myVersion");
        setList({ id: "", name: "", type: "", items: [["", false]] },"unSaved");
        setList({ id: "", name: "", type: "", items: [["", false]] },"tmpCont");
    }
    else {
        console.log("version is good!");
        setList(get_store_value(version), "myVersion");
    }

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

/* src/Header.svelte generated by Svelte v3.21.0 */
const file = "src/Header.svelte";

function create_fragment(ctx) {
	let button;
	let t0;
	let span;
	let t1;
	let dispose;

	const block = {
		c: function create() {
			button = element("button");
			t0 = text("My_Stuff ");
			span = element("span");
			t1 = text(/*$version*/ ctx[0]);
			set_style(span, "font-size", "1rem");
			set_style(span, "color", "gray");
			add_location(span, file, 22, 67, 454);
			attr_dev(button, "id", "main_link");
			attr_dev(button, "class", "svelte-1mvd3j6");
			add_location(button, file, 22, 0, 387);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor, remount) {
			insert_dev(target, button, anchor);
			append_dev(button, t0);
			append_dev(button, span);
			append_dev(span, t1);
			if (remount) dispose();
			dispose = listen_dev(button, "click", /*click_handler*/ ctx[1], false, false, false);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*$version*/ 1) set_data_dev(t1, /*$version*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let $version;
	validate_store(version, "version");
	component_subscribe($$self, version, $$value => $$invalidate(0, $version = $$value));
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Header> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Header", $$slots, []);
	const click_handler = () => toggle("main");
	$$self.$capture_state = () => ({ toggle, version, $version });
	return [$version, click_handler];
}

class Header extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Header",
			options,
			id: create_fragment.name
		});
	}
}

// Editing any Container Function
function editCont(name, type, items, id) {
    console.log("tmpContis: " + id);

    tmpCont.set({
        name: name,
        type: type,
        items: items,
        id: id
    });

    console.log(tmpCont);

}

function deleteContainer(oId) {
    let x = get_store_value(myContainers).findIndex(x => x.id === oId);
    let tmpContainer = get_store_value(myContainers);
    tmpContainer.splice(x, 1);
    myContainers.update(() => tmpContainer);

    setList({ id: "", name: "", type: "", items: [["", false]] }, "tmpCont");
    setList(get_store_value(myContainers), "myStuff");
}

function addContainer(nname, ntype, nitems, oId = "", ninteract= false) {
    // if (!nitems.every((cell) => Array.isArray(cell))) {
    //     let tmp = nitems.map( item => [item,true]);
    //     nitems = tmp;
    // }
    if (oId == "") {
        console.log("I am Creating new one");
        myContainers.update(existing => [...existing, {
            id: existing.length + Math.random(),
            name: nname,
            type: ntype,
            items: nitems,
            interact: false
        }]
        );
        setList({ id: "", name: "", type: "", items: [["", false]] }, "unSaved");
    }
    else {
        console.log("updating the container...");
        let x = get_store_value(myContainers).findIndex(x => x.id === oId);
        let tmpContainer = get_store_value(myContainers);
        tmpContainer.splice(x, 1, {
            id: oId,
            name: nname,
            type: ntype,
            items: nitems,
            interact: ninteract

        });
        myContainers.update(() => tmpContainer);

        setList({ id: "", name: "", type: "", items: [["", false]] }, "tmpCont");
    }

    setList(get_store_value(myContainers), "myStuff");

}

// export function interactSync() {
//     if (get(contInt)[0].id == undefined) {
//         const tmp = get(myContainers).map(e => [{
//             id: e.id, items: e.items.map(() => {
//                 return "aaa"
//             })
//         }]
//         );
//         console.log("Interact Sync-TMP: ", tmp);
//         contInt.update(
//             () => tmp
//         );
//     } else {
//         const tmp = get(myContainers).map(e => [{
//             id: e.id, items: e.items.map(() => {
//                 return "aaa"
//             })
//         }]
//         );
//         console.log("Interact Sync-TMP: ", tmp);
//         contInt.update(
//             () => tmp
//         );
//         // contInt.update(
//         //     tmp => [{ id: tmp.id, items: (tmp.items = true) }]
//         // );
//     }
//     const finaltmp = get(myContainers).map(e => [{
//         id: e.id,
//         name: e.name,
//         type: e.type,
//         items: [e.items.map(ele => [ele,
//             get(contInt).find(x => x.id == e.id)]
//         )]
//     }]//EN SON BURDA KALDIN
//     );
//     console.log("Interact Sync--- FINALTMP: ", finaltmp);
//     totalContainers.update(() => finaltmp);
//     setList(get(contInt), "contInt");
//     console.log("Interact Sync: ", get(contInt));
// }

function cubicOut(t) {
    const f = t - 1.0;
    return f * f * f + 1.0;
}

function fade(node, { delay = 0, duration = 400, easing = identity }) {
    const o = +getComputedStyle(node).opacity;
    return {
        delay,
        duration,
        easing,
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
function slide(node, { delay = 0, duration = 400, easing = cubicOut }) {
    const style = getComputedStyle(node);
    const opacity = +style.opacity;
    const height = parseFloat(style.height);
    const padding_top = parseFloat(style.paddingTop);
    const padding_bottom = parseFloat(style.paddingBottom);
    const margin_top = parseFloat(style.marginTop);
    const margin_bottom = parseFloat(style.marginBottom);
    const border_top_width = parseFloat(style.borderTopWidth);
    const border_bottom_width = parseFloat(style.borderBottomWidth);
    return {
        delay,
        duration,
        easing,
        css: t => `overflow: hidden;` +
            `opacity: ${Math.min(t * 20, 1) * opacity};` +
            `height: ${t * height}px;` +
            `padding-top: ${t * padding_top}px;` +
            `padding-bottom: ${t * padding_bottom}px;` +
            `margin-top: ${t * margin_top}px;` +
            `margin-bottom: ${t * margin_bottom}px;` +
            `border-top-width: ${t * border_top_width}px;` +
            `border-bottom-width: ${t * border_bottom_width}px;`
    };
}

/* src/components/Modal.svelte generated by Svelte v3.21.0 */
const file$1 = "src/components/Modal.svelte";

// (43:10)          
function fallback_block(ctx) {
	let button;
	let dispose;

	const block = {
		c: function create() {
			button = element("button");
			button.textContent = "Close";
			attr_dev(button, "name", "modal-close");
			add_location(button, file$1, 43, 8, 889);
		},
		m: function mount(target, anchor, remount) {
			insert_dev(target, button, anchor);
			if (remount) dispose();
			dispose = listen_dev(button, "click", /*click_handler_1*/ ctx[5], false, false, false);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: fallback_block.name,
		type: "fallback",
		source: "(43:10)          ",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let div0;
	let t0;
	let div1;
	let t1;
	let t2;
	let div1_transition;
	let current;
	let dispose;
	const default_slot_template = /*$$slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);
	const default_slot_or_fallback = default_slot || fallback_block(ctx);

	const block = {
		c: function create() {
			div0 = element("div");
			t0 = space();
			div1 = element("div");
			t1 = text(/*content*/ ctx[0]);
			t2 = space();
			if (default_slot_or_fallback) default_slot_or_fallback.c();
			attr_dev(div0, "class", "modal-bg svelte-1df7d0c");
			add_location(div0, file$1, 38, 0, 751);
			attr_dev(div1, "class", "modal svelte-1df7d0c");
			add_location(div1, file$1, 40, 0, 821);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor, remount) {
			insert_dev(target, div0, anchor);
			insert_dev(target, t0, anchor);
			insert_dev(target, div1, anchor);
			append_dev(div1, t1);
			append_dev(div1, t2);

			if (default_slot_or_fallback) {
				default_slot_or_fallback.m(div1, null);
			}

			current = true;
			if (remount) dispose();
			dispose = listen_dev(div0, "click", /*click_handler*/ ctx[4], false, false, false);
		},
		p: function update(ctx, [dirty]) {
			if (!current || dirty & /*content*/ 1) set_data_dev(t1, /*content*/ ctx[0]);

			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 4) {
					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[2], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null));
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot_or_fallback, local);

			add_render_callback(() => {
				if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fly, {}, true);
				div1_transition.run(1);
			});

			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot_or_fallback, local);
			if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fly, {}, false);
			div1_transition.run(0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div0);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div1);
			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
			if (detaching && div1_transition) div1_transition.end();
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	const dispatch = createEventDispatcher();
	let { content } = $$props;
	const writable_props = ["content"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Modal> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Modal", $$slots, ['default']);
	const click_handler = () => dispatch("cancel");
	const click_handler_1 = () => dispatch("close");

	$$self.$set = $$props => {
		if ("content" in $$props) $$invalidate(0, content = $$props.content);
		if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		fly,
		dispatch,
		content
	});

	$$self.$inject_state = $$props => {
		if ("content" in $$props) $$invalidate(0, content = $$props.content);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [content, dispatch, $$scope, $$slots, click_handler, click_handler_1];
}

class Modal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { content: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Modal",
			options,
			id: create_fragment$1.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*content*/ ctx[0] === undefined && !("content" in props)) {
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

function flip(node, animation, params) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;
    const scaleX = animation.from.width / node.clientWidth;
    const scaleY = animation.from.height / node.clientHeight;
    const dx = (animation.from.left - animation.to.left) / scaleX;
    const dy = (animation.from.top - animation.to.top) / scaleY;
    const d = Math.sqrt(dx * dx + dy * dy);
    const { delay = 0, duration = (d) => Math.sqrt(d) * 120, easing = cubicOut } = params;
    return {
        delay,
        duration: is_function(duration) ? duration(d) : duration,
        easing,
        css: (_t, u) => `transform: ${transform} translate(${u * dx}px, ${u * dy}px);`
    };
}

/* src/components/Create.svelte generated by Svelte v3.21.0 */

const { console: console_1 } = globals;
const file$2 = "src/components/Create.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[19] = list[i];
	child_ctx[20] = list;
	child_ctx[21] = i;
	return child_ctx;
}

// (184:16) {#if i != 0}
function create_if_block_2(ctx) {
	let button;
	let div;
	let dispose;

	const block = {
		c: function create() {
			button = element("button");
			div = element("div");
			attr_dev(div, "class", "minus svelte-dfzaog");
			add_location(div, file$2, 185, 20, 4877);
			attr_dev(button, "name", "rem-item");
			attr_dev(button, "class", "svelte-dfzaog");
			add_location(button, file$2, 184, 16, 4800);
		},
		m: function mount(target, anchor, remount) {
			insert_dev(target, button, anchor);
			append_dev(button, div);
			if (remount) dispose();

			dispose = listen_dev(
				button,
				"click",
				function () {
					if (is_function(/*remItem*/ ctx[9].bind(this, /*i*/ ctx[21]))) /*remItem*/ ctx[9].bind(this, /*i*/ ctx[21]).apply(this, arguments);
				},
				false,
				false,
				false
			);
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(184:16) {#if i != 0}",
		ctx
	});

	return block;
}

// (178:8) {#each items as item, i (i)}
function create_each_block(key_1, ctx) {
	let div1;
	let input;
	let t0;
	let t1;
	let button;
	let div0;
	let div1_transition;
	let current;
	let dispose;

	function input_input_handler() {
		/*input_input_handler*/ ctx[13].call(input, /*item*/ ctx[19]);
	}

	let if_block = /*i*/ ctx[21] != 0 && create_if_block_2(ctx);

	function click_handler(...args) {
		return /*click_handler*/ ctx[14](/*item*/ ctx[19], ...args);
	}

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			div1 = element("div");
			input = element("input");
			t0 = space();
			if (if_block) if_block.c();
			t1 = space();
			button = element("button");
			div0 = element("div");
			attr_dev(input, "type", "text");
			attr_dev(input, "name", "tmpitems");
			attr_dev(input, "autocomplete", "off");
			attr_dev(input, "maxlength", "48");
			attr_dev(input, "placeholder", /*inputMsg*/ ctx[5]);
			input.required = true;
			attr_dev(input, "class", "svelte-dfzaog");
			add_location(input, file$2, 181, 16, 4611);
			attr_dev(div0, "class", "cross svelte-dfzaog");
			add_location(div0, file$2, 189, 20, 5049);
			attr_dev(button, "name", "add-item");
			attr_dev(button, "class", "svelte-dfzaog");
			add_location(button, file$2, 188, 16, 4967);
			attr_dev(div1, "class", "itemslist svelte-dfzaog");
			add_location(div1, file$2, 178, 12, 4500);
			this.first = div1;
		},
		m: function mount(target, anchor, remount) {
			insert_dev(target, div1, anchor);
			append_dev(div1, input);
			set_input_value(input, /*item*/ ctx[19][0]);
			append_dev(div1, t0);
			if (if_block) if_block.m(div1, null);
			append_dev(div1, t1);
			append_dev(div1, button);
			append_dev(button, div0);
			current = true;
			if (remount) run_all(dispose);

			dispose = [
				listen_dev(input, "input", input_input_handler),
				listen_dev(button, "click", click_handler, false, false, false)
			];
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (!current || dirty & /*inputMsg*/ 32) {
				attr_dev(input, "placeholder", /*inputMsg*/ ctx[5]);
			}

			if (dirty & /*items*/ 4 && input.value !== /*item*/ ctx[19][0]) {
				set_input_value(input, /*item*/ ctx[19][0]);
			}

			if (/*i*/ ctx[21] != 0) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_2(ctx);
					if_block.c();
					if_block.m(div1, t1);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: function intro(local) {
			if (current) return;

			add_render_callback(() => {
				if (!div1_transition) div1_transition = create_bidirectional_transition(div1, slide, { key: /*i*/ ctx[21] }, true);
				div1_transition.run(1);
			});

			current = true;
		},
		o: function outro(local) {
			if (!div1_transition) div1_transition = create_bidirectional_transition(div1, slide, { key: /*i*/ ctx[21] }, false);
			div1_transition.run(0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			if (if_block) if_block.d();
			if (detaching && div1_transition) div1_transition.end();
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(178:8) {#each items as item, i (i)}",
		ctx
	});

	return block;
}

// (195:12) {#if editt}
function create_if_block_1(ctx) {
	let button;
	let dispose;

	const block = {
		c: function create() {
			button = element("button");
			button.textContent = "Delete";
			attr_dev(button, "name", "delete-container");
			set_style(button, "color", "red");
			set_style(button, "background-color", "#f5f5f6");
			attr_dev(button, "class", "svelte-dfzaog");
			add_location(button, file$2, 195, 12, 5219);
		},
		m: function mount(target, anchor, remount) {
			insert_dev(target, button, anchor);
			if (remount) dispose();
			dispose = listen_dev(button, "click", /*click_handler_1*/ ctx[15], false, false, false);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(195:12) {#if editt}",
		ctx
	});

	return block;
}

// (204:0) {#if delModal}
function create_if_block(ctx) {
	let current;

	const modal = new Modal({
			props: {
				content: "Are you sure you wanna delete this container?",
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	modal.$on("cancel", /*cancel_handler*/ ctx[17]);
	modal.$on("close", /*close_handler*/ ctx[18]);

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const modal_changes = {};

			if (dirty & /*$$scope, delModal*/ 4194320) {
				modal_changes.$$scope = { dirty, ctx };
			}

			modal.$set(modal_changes);
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

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(204:0) {#if delModal}",
		ctx
	});

	return block;
}

// (205:4) <Modal content="Are you sure you wanna delete this container?" on:cancel="{ () => delModal = false}" on:close="{ () => delModal = false}">
function create_default_slot(ctx) {
	let t0;
	let div;
	let button0;
	let t2;
	let button1;
	let dispose;

	const block = {
		c: function create() {
			t0 = text("Delete Confirm Modal\n        ");
			div = element("div");
			button0 = element("button");
			button0.textContent = "Yes";
			t2 = space();
			button1 = element("button");
			button1.textContent = "No";
			set_style(button0, "background-color", "red");
			attr_dev(button0, "class", "svelte-dfzaog");
			add_location(button0, file$2, 207, 12, 5734);
			attr_dev(button1, "class", "svelte-dfzaog");
			add_location(button1, file$2, 208, 12, 5827);
			attr_dev(div, "class", "row-buttons svelte-dfzaog");
			add_location(div, file$2, 206, 8, 5696);
		},
		m: function mount(target, anchor, remount) {
			insert_dev(target, t0, anchor);
			insert_dev(target, div, anchor);
			append_dev(div, button0);
			append_dev(div, t2);
			append_dev(div, button1);
			if (remount) run_all(dispose);

			dispose = [
				listen_dev(button0, "click", /*deleteSubmit*/ ctx[7], { once: true }, false, false),
				listen_dev(button1, "click", /*click_handler_2*/ ctx[16], false, false, false)
			];
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div);
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(205:4) <Modal content=\\\"Are you sure you wanna delete this container?\\\" on:cancel=\\\"{ () => delModal = false}\\\" on:close=\\\"{ () => delModal = false}\\\">",
		ctx
	});

	return block;
}

function create_fragment$2(ctx) {
	let div1;
	let label;
	let input0;
	let t0;
	let input1;
	let t1;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let t2;
	let div0;
	let t3;
	let button;
	let div0_transition;
	let div1_intro;
	let div1_outro;
	let t5;
	let if_block1_anchor;
	let current;
	let dispose;
	let each_value = /*items*/ ctx[2];
	validate_each_argument(each_value);
	const get_key = ctx => /*i*/ ctx[21];
	validate_each_keys(ctx, each_value, get_each_context, get_key);

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	let if_block0 = /*editt*/ ctx[3] && create_if_block_1(ctx);
	let if_block1 = /*delModal*/ ctx[4] && create_if_block(ctx);

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
			attr_dev(input0, "type", "text");
			attr_dev(input0, "name", "name");
			attr_dev(input0, "autocomplete", "off");
			attr_dev(input0, "maxlength", "25");
			attr_dev(input0, "placeholder", "The Container Name");
			input0.required = true;
			attr_dev(input0, "class", "svelte-dfzaog");
			add_location(input0, file$2, 172, 8, 4158);
			attr_dev(input1, "type", "text");
			attr_dev(input1, "name", "type");
			attr_dev(input1, "autocomplete", "off");
			attr_dev(input1, "maxlength", "32");
			attr_dev(input1, "placeholder", "The Container Type");
			input1.required = true;
			attr_dev(input1, "class", "svelte-dfzaog");
			add_location(input1, file$2, 174, 8, 4305);
			attr_dev(button, "name", "save-container");
			attr_dev(button, "class", "svelte-dfzaog");
			add_location(button, file$2, 197, 12, 5379);
			attr_dev(div0, "class", "buttons svelte-dfzaog");
			add_location(div0, file$2, 193, 8, 5144);
			attr_dev(label, "class", "svelte-dfzaog");
			add_location(label, file$2, 171, 4, 4142);
			attr_dev(div1, "classname", "create-new");
			attr_dev(div1, "class", "svelte-dfzaog");
			add_location(div1, file$2, 170, 0, 4051);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor, remount) {
			insert_dev(target, div1, anchor);
			append_dev(div1, label);
			append_dev(label, input0);
			set_input_value(input0, /*name*/ ctx[0]);
			append_dev(label, t0);
			append_dev(label, input1);
			set_input_value(input1, /*type*/ ctx[1]);
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
			if (remount) run_all(dispose);

			dispose = [
				listen_dev(input0, "input", /*input0_input_handler*/ ctx[11]),
				listen_dev(input1, "input", /*input1_input_handler*/ ctx[12]),
				listen_dev(button, "click", /*handleSubmit*/ ctx[6], { once: true }, false, false)
			];
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*name*/ 1 && input0.value !== /*name*/ ctx[0]) {
				set_input_value(input0, /*name*/ ctx[0]);
			}

			if (dirty & /*type*/ 2 && input1.value !== /*type*/ ctx[1]) {
				set_input_value(input1, /*type*/ ctx[1]);
			}

			if (dirty & /*items, newItem, remItem, inputMsg*/ 804) {
				const each_value = /*items*/ ctx[2];
				validate_each_argument(each_value);
				group_outros();
				validate_each_keys(ctx, each_value, get_each_context, get_key);
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, label, outro_and_destroy_block, create_each_block, t2, get_each_context);
				check_outros();
			}

			if (/*editt*/ ctx[3]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_1(ctx);
					if_block0.c();
					if_block0.m(div0, t3);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*delModal*/ ctx[4]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*delModal*/ 16) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
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
				if (!div0_transition) div0_transition = create_bidirectional_transition(div0, slide, {}, true);
				div0_transition.run(1);
			});

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

			if (!div0_transition) div0_transition = create_bidirectional_transition(div0, slide, {}, false);
			div0_transition.run(0);
			if (div1_intro) div1_intro.invalidate();
			div1_outro = create_out_transition(div1, fade, { duration: 0 });
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			if (if_block0) if_block0.d();
			if (detaching && div0_transition) div0_transition.end();
			if (detaching && div1_outro) div1_outro.end();
			if (detaching) detach_dev(t5);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let { id = "" } = $$props;
	let { name = "" } = $$props;
	let { type = "" } = $$props;
	let { items = [["", false]] } = $$props;
	let { editt = false } = $$props;
	let delModal = false;
	let inputMsg = "Start adding items to your container!";

	function handleSubmit() {
		if (name && type && items) {
			// items = items.filter(Boolean);
			items[items.length - 1][0] === ""
			? items.splice(items.length - 1, 1)
			: null;

			items[items.length - 1][1] === true
			? $$invalidate(2, items[items.length - 1][1] = false, items)
			: null;

			addContainer(name, type, items, id);
			console.log("handleSubmitted");
			toggle("main");
			$$invalidate(3, editt = false);
		}
	}

	function deleteSubmit() {
		deleteContainer(id);
		toggle("main");
	}

	function newItem(itm) {
		if (items[items.length - 1][0] !== "") {
			$$invalidate(2, items[items.length - 1] = [itm, false], items);
			$$invalidate(2, items = [...items, ["", true]]);
		}
	}

	function remItem(index) {
		console.log(index + " th item deleted");

		$$invalidate(2, items = items.filter((i, idx) => {
			return idx !== index;
		}));
	}

	const writable_props = ["id", "name", "type", "items", "editt"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Create> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Create", $$slots, []);

	function input0_input_handler() {
		name = this.value;
		$$invalidate(0, name);
	}

	function input1_input_handler() {
		type = this.value;
		$$invalidate(1, type);
	}

	function input_input_handler(item) {
		item[0] = this.value;
		$$invalidate(2, items);
	}

	const click_handler = item => newItem(item[0]);
	const click_handler_1 = () => $$invalidate(4, delModal = true);
	const click_handler_2 = () => $$invalidate(4, delModal = false);
	const cancel_handler = () => $$invalidate(4, delModal = false);
	const close_handler = () => $$invalidate(4, delModal = false);

	$$self.$set = $$props => {
		if ("id" in $$props) $$invalidate(10, id = $$props.id);
		if ("name" in $$props) $$invalidate(0, name = $$props.name);
		if ("type" in $$props) $$invalidate(1, type = $$props.type);
		if ("items" in $$props) $$invalidate(2, items = $$props.items);
		if ("editt" in $$props) $$invalidate(3, editt = $$props.editt);
	};

	$$self.$capture_state = () => ({
		addContainer,
		deleteContainer,
		toggle,
		setList,
		Modal,
		fade,
		slide,
		flip,
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
		remItem
	});

	$$self.$inject_state = $$props => {
		if ("id" in $$props) $$invalidate(10, id = $$props.id);
		if ("name" in $$props) $$invalidate(0, name = $$props.name);
		if ("type" in $$props) $$invalidate(1, type = $$props.type);
		if ("items" in $$props) $$invalidate(2, items = $$props.items);
		if ("editt" in $$props) $$invalidate(3, editt = $$props.editt);
		if ("delModal" in $$props) $$invalidate(4, delModal = $$props.delModal);
		if ("inputMsg" in $$props) $$invalidate(5, inputMsg = $$props.inputMsg);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*items*/ 4) {
			 if (items.length > 1) {
				$$invalidate(5, inputMsg = "And another one");
			}
		}

		if ($$self.$$.dirty & /*name, type, items, editt*/ 15) {
			 {
				console.log(name + ":" + type + ":" + items);

				editt
				? setList({ name, type, items }, "tmpCont")
				: setList({ name, type, items }, "unSaved");

				console.log("the last item is::::::::::::::::::::::", items.slice(-1)[1]);
			}
		}

		if ($$self.$$.dirty & /*items*/ 4) {
			 {
				console.log(items.length + " items:" + items);
			}
		}
	};

	return [
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
		id,
		input0_input_handler,
		input1_input_handler,
		input_input_handler,
		click_handler,
		click_handler_1,
		click_handler_2,
		cancel_handler,
		close_handler
	];
}

class Create extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
			id: 10,
			name: 0,
			type: 1,
			items: 2,
			editt: 3
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Create",
			options,
			id: create_fragment$2.name
		});
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

/* src/components/NewButton.svelte generated by Svelte v3.21.0 */
const file$3 = "src/components/NewButton.svelte";

// (58:32) 
function create_if_block_1$1(ctx) {
	const block = { c: noop, m: noop, p: noop, d: noop };

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$1.name,
		type: "if",
		source: "(58:32) ",
		ctx
	});

	return block;
}

// (54:0) {#if button === 'newlist'}
function create_if_block$1(ctx) {
	let button_1;
	let div;
	let dispose;

	const block = {
		c: function create() {
			button_1 = element("button");
			div = element("div");
			attr_dev(div, "id", "cross");
			attr_dev(div, "class", "svelte-kbhj1o");
			add_location(div, file$3, 55, 4, 1185);
			attr_dev(button_1, "id", "menu-edit-create");
			attr_dev(button_1, "name", "new-list");
			attr_dev(button_1, "class", "svelte-kbhj1o");
			add_location(button_1, file$3, 54, 0, 1098);
		},
		m: function mount(target, anchor, remount) {
			insert_dev(target, button_1, anchor);
			append_dev(button_1, div);
			if (remount) dispose();
			dispose = listen_dev(button_1, "click", /*click_handler*/ ctx[1], false, false, false);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(button_1);
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(54:0) {#if button === 'newlist'}",
		ctx
	});

	return block;
}

function create_fragment$3(ctx) {
	let if_block_anchor;

	function select_block_type(ctx, dirty) {
		if (/*button*/ ctx[0] === "newlist") return create_if_block$1;
		if (/*button*/ ctx[0] === "editlist") return create_if_block_1$1;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type && current_block_type(ctx);

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
		p: function update(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
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
			if (if_block) {
				if_block.d(detaching);
			}

			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
	let { button } = $$props;
	const writable_props = ["button"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<NewButton> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("NewButton", $$slots, []);
	const click_handler = () => toggle(button);

	$$self.$set = $$props => {
		if ("button" in $$props) $$invalidate(0, button = $$props.button);
	};

	$$self.$capture_state = () => ({ toggle, button });

	$$self.$inject_state = $$props => {
		if ("button" in $$props) $$invalidate(0, button = $$props.button);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [button, click_handler];
}

class NewButton extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3, create_fragment$3, safe_not_equal, { button: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "NewButton",
			options,
			id: create_fragment$3.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*button*/ ctx[0] === undefined && !("button" in props)) {
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

/* src/components/Container.svelte generated by Svelte v3.21.0 */

const { console: console_1$1 } = globals;
const file$4 = "src/components/Container.svelte";

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[11] = list[i];
	child_ctx[13] = i;
	return child_ctx;
}

// (136:8) {#if !isSum}
function create_if_block$2(ctx) {
	let div2;
	let t0;
	let t1;
	let t2;
	let t3;
	let t4;
	let ul;
	let t5;
	let div1;
	let button;
	let t7;
	let div0;
	let t8;
	let div0_class_value;
	let div2_transition;
	let current;
	let dispose;
	let each_value = /*items*/ ctx[0];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			div2 = element("div");
			t0 = text("Type: ");
			t1 = text(/*type*/ ctx[4]);
			t2 = text(" |\n            ");
			t3 = text(/*itemsnum*/ ctx[6]);
			t4 = text(" Stuff here\n            ");
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t5 = space();
			div1 = element("div");
			button = element("button");
			button.textContent = "Edit";
			t7 = space();
			div0 = element("div");
			t8 = text("Interactive Mode");
			attr_dev(ul, "class", "item-list svelte-1lmvq93");
			add_location(ul, file$4, 142, 12, 3624);
			attr_dev(button, "class", "edit-button svelte-1lmvq93");
			attr_dev(button, "name", "edit-button");
			add_location(button, file$4, 148, 16, 3898);

			attr_dev(div0, "class", div0_class_value = "" + (null_to_empty(/*interact*/ ctx[1]
			? "interactive-text-on"
			: "interactive-text-off") + " svelte-1lmvq93"));

			add_location(div0, file$4, 149, 16, 3999);
			attr_dev(div1, "class", "options svelte-1lmvq93");
			add_location(div1, file$4, 147, 12, 3860);
			attr_dev(div2, "class", "details svelte-1lmvq93");
			add_location(div2, file$4, 136, 8, 3449);
		},
		m: function mount(target, anchor, remount) {
			insert_dev(target, div2, anchor);
			append_dev(div2, t0);
			append_dev(div2, t1);
			append_dev(div2, t2);
			append_dev(div2, t3);
			append_dev(div2, t4);
			append_dev(div2, ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			append_dev(div2, t5);
			append_dev(div2, div1);
			append_dev(div1, button);
			append_dev(div1, t7);
			append_dev(div1, div0);
			append_dev(div0, t8);
			current = true;
			if (remount) run_all(dispose);

			dispose = [
				listen_dev(button, "click", /*editHandle*/ ctx[5], false, false, false),
				listen_dev(div0, "click", /*theInteract*/ ctx[8], false, false, false)
			];
		},
		p: function update(ctx, dirty) {
			if (!current || dirty & /*type*/ 16) set_data_dev(t1, /*type*/ ctx[4]);

			if (dirty & /*items, isRed*/ 513) {
				each_value = /*items*/ ctx[0];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
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

			if (!current || dirty & /*interact*/ 2 && div0_class_value !== (div0_class_value = "" + (null_to_empty(/*interact*/ ctx[1]
			? "interactive-text-on"
			: "interactive-text-off") + " svelte-1lmvq93"))) {
				attr_dev(div0, "class", div0_class_value);
			}
		},
		i: function intro(local) {
			if (current) return;

			add_render_callback(() => {
				if (!div2_transition) div2_transition = create_bidirectional_transition(div2, fly, { y: -10, duration: 200 }, true);
				div2_transition.run(1);
			});

			current = true;
		},
		o: function outro(local) {
			if (!div2_transition) div2_transition = create_bidirectional_transition(div2, fly, { y: -10, duration: 200 }, false);
			div2_transition.run(0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			destroy_each(each_blocks, detaching);
			if (detaching && div2_transition) div2_transition.end();
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(136:8) {#if !isSum}",
		ctx
	});

	return block;
}

// (144:16) {#each items as item,i}
function create_each_block$1(ctx) {
	let li;
	let t_value = /*item*/ ctx[11][0] + "";
	let t;
	let li_class_value;
	let dispose;

	const block = {
		c: function create() {
			li = element("li");
			t = text(t_value);
			attr_dev(li, "class", li_class_value = "" + (null_to_empty(/*item*/ ctx[11][1] ? "item-not-red" : "item-red") + " svelte-1lmvq93"));
			add_location(li, file$4, 144, 20, 3707);
		},
		m: function mount(target, anchor, remount) {
			insert_dev(target, li, anchor);
			append_dev(li, t);
			if (remount) dispose();
			dispose = listen_dev(li, "click", /*isRed*/ ctx[9].bind(this, /*i*/ ctx[13]), false, false, false);
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*items*/ 1 && t_value !== (t_value = /*item*/ ctx[11][0] + "")) set_data_dev(t, t_value);

			if (dirty & /*items*/ 1 && li_class_value !== (li_class_value = "" + (null_to_empty(/*item*/ ctx[11][1] ? "item-not-red" : "item-red") + " svelte-1lmvq93"))) {
				attr_dev(li, "class", li_class_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$1.name,
		type: "each",
		source: "(144:16) {#each items as item,i}",
		ctx
	});

	return block;
}

function create_fragment$4(ctx) {
	let div1;
	let div0;
	let t0;
	let t1;
	let hr;
	let t2;
	let div1_class_value;
	let div1_intro;
	let div1_outro;
	let current;
	let dispose;
	let if_block = !/*isSum*/ ctx[2] && create_if_block$2(ctx);

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			t0 = text(/*name*/ ctx[3]);
			t1 = space();
			hr = element("hr");
			t2 = space();
			if (if_block) if_block.c();
			attr_dev(div0, "id", "name");
			attr_dev(div0, "class", "svelte-1lmvq93");
			add_location(div0, file$4, 129, 8, 3271);
			set_style(hr, "width", "90%");
			set_style(hr, "border-color", "#e1e2e186");
			add_location(hr, file$4, 132, 8, 3350);

			attr_dev(div1, "class", div1_class_value = "" + (null_to_empty(/*interact*/ ctx[1]
			? "containersum containersum-on"
			: "containersum containersum-off") + " svelte-1lmvq93"));

			add_location(div1, file$4, 127, 4, 3112);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor, remount) {
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);
			append_dev(div0, t0);
			append_dev(div1, t1);
			append_dev(div1, hr);
			append_dev(div1, t2);
			if (if_block) if_block.m(div1, null);
			current = true;
			if (remount) dispose();
			dispose = listen_dev(div0, "click", /*details*/ ctx[7], false, false, false);
		},
		p: function update(ctx, [dirty]) {
			if (!current || dirty & /*name*/ 8) set_data_dev(t0, /*name*/ ctx[3]);

			if (!/*isSum*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*isSum*/ 4) {
						transition_in(if_block, 1);
					}
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

			if (!current || dirty & /*interact*/ 2 && div1_class_value !== (div1_class_value = "" + (null_to_empty(/*interact*/ ctx[1]
			? "containersum containersum-on"
			: "containersum containersum-off") + " svelte-1lmvq93"))) {
				attr_dev(div1, "class", div1_class_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);

			add_render_callback(() => {
				if (div1_outro) div1_outro.end(1);
				if (!div1_intro) div1_intro = create_in_transition(div1, fade, { duration: 200 });
				div1_intro.start();
			});

			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			if (div1_intro) div1_intro.invalidate();
			div1_outro = create_out_transition(div1, fade, { duration: 0 });
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			if (if_block) if_block.d();
			if (detaching && div1_outro) div1_outro.end();
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4($$self, $$props, $$invalidate) {
	let { id = "" } = $$props;
	let { name = "TestName" } = $$props;
	let { type = "TestType" } = $$props;
	let { items = ["sugar"] } = $$props;
	let { interact = false } = $$props;
	let itemsnum = items.length;
	let { isSum = true } = $$props;

	function editHandle() {
		editCont(name, type, items, id);
		toggle("editlist");
		console.log("handleSubmitted by editCont");
	}

	function details() {
		$$invalidate(2, isSum = !isSum);
	}

	function theInteract() {
		$$invalidate(1, interact = !interact);
		addContainer(name, type, items, id, interact);
	}

	function isRed(index) {
		if (interact) {
			$$invalidate(0, items[index][1] = !items[index][1], items);
			addContainer(name, type, items, id, interact);
		} // !event.target.style.color ? event.target.style.color = "red" : event.target.style.color = "";
		// console.log(event.target.style.color);
	} // console.log(event.target);

	const writable_props = ["id", "name", "type", "items", "interact", "isSum"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$1.warn(`<Container> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Container", $$slots, []);

	$$self.$set = $$props => {
		if ("id" in $$props) $$invalidate(10, id = $$props.id);
		if ("name" in $$props) $$invalidate(3, name = $$props.name);
		if ("type" in $$props) $$invalidate(4, type = $$props.type);
		if ("items" in $$props) $$invalidate(0, items = $$props.items);
		if ("interact" in $$props) $$invalidate(1, interact = $$props.interact);
		if ("isSum" in $$props) $$invalidate(2, isSum = $$props.isSum);
	};

	$$self.$capture_state = () => ({
		Create,
		toggle,
		addContainer,
		editCont,
		NewButton,
		fly,
		fade,
		id,
		name,
		type,
		items,
		interact,
		itemsnum,
		isSum,
		editHandle,
		details,
		theInteract,
		isRed
	});

	$$self.$inject_state = $$props => {
		if ("id" in $$props) $$invalidate(10, id = $$props.id);
		if ("name" in $$props) $$invalidate(3, name = $$props.name);
		if ("type" in $$props) $$invalidate(4, type = $$props.type);
		if ("items" in $$props) $$invalidate(0, items = $$props.items);
		if ("interact" in $$props) $$invalidate(1, interact = $$props.interact);
		if ("itemsnum" in $$props) $$invalidate(6, itemsnum = $$props.itemsnum);
		if ("isSum" in $$props) $$invalidate(2, isSum = $$props.isSum);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*interact*/ 2) {
			 console.log("interaction is: ", interact);
		}
	};

	return [
		items,
		interact,
		isSum,
		name,
		type,
		editHandle,
		itemsnum,
		details,
		theInteract,
		isRed,
		id
	];
}

class Container extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
			id: 10,
			name: 3,
			type: 4,
			items: 0,
			interact: 1,
			isSum: 2,
			editHandle: 5
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Container",
			options,
			id: create_fragment$4.name
		});
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

	get interact() {
		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set interact(value) {
		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isSum() {
		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isSum(value) {
		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get editHandle() {
		return this.$$.ctx[5];
	}

	set editHandle(value) {
		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/ContainerSum.svelte generated by Svelte v3.21.0 */
const file$5 = "src/components/ContainerSum.svelte";

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	child_ctx[3] = i;
	return child_ctx;
}

// (35:4) {:else}
function create_else_block(ctx) {
	let div2;
	let div0;
	let t1;
	let div1;
	let t3;

	const block = {
		c: function create() {
			div2 = element("div");
			div0 = element("div");
			div0.textContent = "Welcome to MyStuff! Start adding Containers to the app using the plus button so you\n                can keep track of stuff you have, even when you forgot the app remembers!";
			t1 = space();
			div1 = element("div");
			div1.textContent = "This app saves all data to your local store so all your data is on your device.";
			t3 = space();
			add_location(div0, file$5, 37, 12, 902);
			add_location(div1, file$5, 42, 12, 1142);
			attr_dev(div2, "class", "welcome svelte-lppm3v");
			add_location(div2, file$5, 35, 8, 854);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div0);
			append_dev(div2, t1);
			append_dev(div2, div1);
			append_dev(div2, t3);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(35:4) {:else}",
		ctx
	});

	return block;
}

// (29:4) {#each $myContainers as container, i (container.id)}
function create_each_block$2(key_1, ctx) {
	let first;
	let current;
	const container_spread_levels = [/*container*/ ctx[1]];
	let container_props = {};

	for (let i = 0; i < container_spread_levels.length; i += 1) {
		container_props = assign(container_props, container_spread_levels[i]);
	}

	const container = new Container({ props: container_props, $$inline: true });

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			first = empty();
			create_component(container.$$.fragment);
			this.first = first;
		},
		m: function mount(target, anchor) {
			insert_dev(target, first, anchor);
			mount_component(container, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const container_changes = (dirty & /*$myContainers*/ 1)
			? get_spread_update(container_spread_levels, [get_spread_object(/*container*/ ctx[1])])
			: {};

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
			if (detaching) detach_dev(first);
			destroy_component(container, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$2.name,
		type: "each",
		source: "(29:4) {#each $myContainers as container, i (container.id)}",
		ctx
	});

	return block;
}

function create_fragment$5(ctx) {
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_1_anchor;
	let current;
	let each_value = /*$myContainers*/ ctx[0];
	validate_each_argument(each_value);
	const get_key = ctx => /*container*/ ctx[1].id;
	validate_each_keys(ctx, each_value, get_each_context$2, get_key);

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$2(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
	}

	let each_1_else = null;

	if (!each_value.length) {
		each_1_else = create_else_block(ctx);
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();

			if (each_1_else) {
				each_1_else.c();
			}
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
		p: function update(ctx, [dirty]) {
			if (dirty & /*$myContainers*/ 1) {
				const each_value = /*$myContainers*/ ctx[0];
				validate_each_argument(each_value);
				group_outros();
				validate_each_keys(ctx, each_value, get_each_context$2, get_key);
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block$2, each_1_anchor, get_each_context$2);
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

			if (detaching) detach_dev(each_1_anchor);
			if (each_1_else) each_1_else.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$5.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$5($$self, $$props, $$invalidate) {
	let $myContainers;
	validate_store(myContainers, "myContainers");
	component_subscribe($$self, myContainers, $$value => $$invalidate(0, $myContainers = $$value));
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ContainerSum> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("ContainerSum", $$slots, []);
	$$self.$capture_state = () => ({ Container, myContainers, $myContainers });
	return [$myContainers];
}

class ContainerSum extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ContainerSum",
			options,
			id: create_fragment$5.name
		});
	}
}

/* src/CurrentPage.svelte generated by Svelte v3.21.0 */

const { console: console_1$2 } = globals;

// (52:0) {:else}
function create_else_block$1(ctx) {
	let t0;
	let t1;
	let t2;
	let t3;
	let t4;
	let t5;
	let t6;
	let t7;
	let current;
	const containersum = new ContainerSum({ $$inline: true });

	const newbutton = new NewButton({
			props: { button: "newlist" },
			$$inline: true
		});

	const block = {
		c: function create() {
			t0 = text("width:");
			t1 = text(/*w*/ ctx[0]);
			t2 = text(" height:");
			t3 = text(/*h*/ ctx[1]);
			t4 = text(" ratio: ");
			t5 = text(/*ratio*/ ctx[2]);
			t6 = space();
			create_component(containersum.$$.fragment);
			t7 = space();
			create_component(newbutton.$$.fragment);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, t1, anchor);
			insert_dev(target, t2, anchor);
			insert_dev(target, t3, anchor);
			insert_dev(target, t4, anchor);
			insert_dev(target, t5, anchor);
			insert_dev(target, t6, anchor);
			mount_component(containersum, target, anchor);
			insert_dev(target, t7, anchor);
			mount_component(newbutton, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (!current || dirty & /*w*/ 1) set_data_dev(t1, /*w*/ ctx[0]);
			if (!current || dirty & /*h*/ 2) set_data_dev(t3, /*h*/ ctx[1]);
			if (!current || dirty & /*ratio*/ 4) set_data_dev(t5, /*ratio*/ ctx[2]);
		},
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
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(t4);
			if (detaching) detach_dev(t5);
			if (detaching) detach_dev(t6);
			destroy_component(containersum, detaching);
			if (detaching) detach_dev(t7);
			destroy_component(newbutton, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$1.name,
		type: "else",
		source: "(52:0) {:else}",
		ctx
	});

	return block;
}

// (43:33) 
function create_if_block_1$2(ctx) {
	let switch_instance_anchor;
	let current;
	var switch_value = Create;

	function switch_props(ctx) {
		return {
			props: {
				name: /*$tmpCont*/ ctx[5].name,
				type: /*$tmpCont*/ ctx[5].type,
				items: /*$tmpCont*/ ctx[5].items,
				id: /*$tmpCont*/ ctx[5].id,
				editt: true
			},
			$$inline: true
		};
	}

	if (switch_value) {
		var switch_instance = new switch_value(switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = {};
			if (dirty & /*$tmpCont*/ 32) switch_instance_changes.name = /*$tmpCont*/ ctx[5].name;
			if (dirty & /*$tmpCont*/ 32) switch_instance_changes.type = /*$tmpCont*/ ctx[5].type;
			if (dirty & /*$tmpCont*/ 32) switch_instance_changes.items = /*$tmpCont*/ ctx[5].items;
			if (dirty & /*$tmpCont*/ 32) switch_instance_changes.id = /*$tmpCont*/ ctx[5].id;

			if (switch_value !== (switch_value = Create)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$2.name,
		type: "if",
		source: "(43:33) ",
		ctx
	});

	return block;
}

// (34:0) {#if $mypage === "newlist"}
function create_if_block$3(ctx) {
	let switch_instance_anchor;
	let current;
	var switch_value = Create;

	function switch_props(ctx) {
		return {
			props: {
				name: /*$unSaved*/ ctx[4].name,
				type: /*$unSaved*/ ctx[4].type,
				items: /*$unSaved*/ ctx[4].items,
				editt: false
			},
			$$inline: true
		};
	}

	if (switch_value) {
		var switch_instance = new switch_value(switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = {};
			if (dirty & /*$unSaved*/ 16) switch_instance_changes.name = /*$unSaved*/ ctx[4].name;
			if (dirty & /*$unSaved*/ 16) switch_instance_changes.type = /*$unSaved*/ ctx[4].type;
			if (dirty & /*$unSaved*/ 16) switch_instance_changes.items = /*$unSaved*/ ctx[4].items;

			if (switch_value !== (switch_value = Create)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$3.name,
		type: "if",
		source: "(34:0) {#if $mypage === \\\"newlist\\\"}",
		ctx
	});

	return block;
}

function create_fragment$6(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$3, create_if_block_1$2, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*$mypage*/ ctx[3] === "newlist") return 0;
		if (/*$mypage*/ ctx[3] === "editlist") return 1;
		return 2;
	}

	current_block_type_index = select_block_type(ctx);
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
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
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
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$6.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$6($$self, $$props, $$invalidate) {
	let $mypage;
	let $unSaved;
	let $tmpCont;
	validate_store(mypage, "mypage");
	component_subscribe($$self, mypage, $$value => $$invalidate(3, $mypage = $$value));
	validate_store(unSaved, "unSaved");
	component_subscribe($$self, unSaved, $$value => $$invalidate(4, $unSaved = $$value));
	validate_store(tmpCont, "tmpCont");
	component_subscribe($$self, tmpCont, $$value => $$invalidate(5, $tmpCont = $$value));
	let { w } = $$props, { h } = $$props;
	let ratio;
	const writable_props = ["w", "h"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$2.warn(`<CurrentPage> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("CurrentPage", $$slots, []);

	$$self.$set = $$props => {
		if ("w" in $$props) $$invalidate(0, w = $$props.w);
		if ("h" in $$props) $$invalidate(1, h = $$props.h);
	};

	$$self.$capture_state = () => ({
		mypage,
		tmpCont,
		unSaved,
		Container,
		Create,
		ContainerSum,
		NewButton,
		w,
		h,
		ratio,
		$mypage,
		$unSaved,
		$tmpCont
	});

	$$self.$inject_state = $$props => {
		if ("w" in $$props) $$invalidate(0, w = $$props.w);
		if ("h" in $$props) $$invalidate(1, h = $$props.h);
		if ("ratio" in $$props) $$invalidate(2, ratio = $$props.ratio);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$mypage*/ 8) {
			// import('./components/Create.svelte')
			//     .then(module => module.default)
			//     .then(Create => { return Create })
			//     .catch(err => console.error(err))
			// let cmp
			// const setComponent = module => {
			//     cmp = module.default
			// }
			// const logError = err => {
			//     console.error(err && err.stack || err)
			// }
			// const loadCreate = e => {
			//     e.preventDefault()
			//     import('./components/Create.svelte').then(setComponent).catch(logError)
			// }
			 console.log("Current page is: " + $mypage);
		}

		if ($$self.$$.dirty & /*w, h*/ 3) {
			 $$invalidate(2, ratio = (w / h).toFixed(2));
		}
	};

	return [w, h, ratio, $mypage, $unSaved, $tmpCont];
}

class CurrentPage extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$6, create_fragment$6, safe_not_equal, { w: 0, h: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CurrentPage",
			options,
			id: create_fragment$6.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*w*/ ctx[0] === undefined && !("w" in props)) {
			console_1$2.warn("<CurrentPage> was created without expected prop 'w'");
		}

		if (/*h*/ ctx[1] === undefined && !("h" in props)) {
			console_1$2.warn("<CurrentPage> was created without expected prop 'h'");
		}
	}

	get w() {
		throw new Error("<CurrentPage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set w(value) {
		throw new Error("<CurrentPage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get h() {
		throw new Error("<CurrentPage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set h(value) {
		throw new Error("<CurrentPage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/App.svelte generated by Svelte v3.21.0 */

const { console: console_1$3 } = globals;
const file$6 = "src/App.svelte";

function create_fragment$7(ctx) {
	let main;
	let t;
	let main_resize_listener;
	let current;
	const header = new Header({ $$inline: true });

	const currentpage = new CurrentPage({
			props: { w: /*w*/ ctx[0], h: /*h*/ ctx[1] },
			$$inline: true
		});

	const block = {
		c: function create() {
			main = element("main");
			create_component(header.$$.fragment);
			t = space();
			create_component(currentpage.$$.fragment);
			attr_dev(main, "alt", "Main Page");
			attr_dev(main, "class", "svelte-10d9n07");
			add_render_callback(() => /*main_elementresize_handler*/ ctx[2].call(main));
			add_location(main, file$6, 32, 0, 769);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, main, anchor);
			mount_component(header, main, null);
			append_dev(main, t);
			mount_component(currentpage, main, null);
			main_resize_listener = add_resize_listener(main, /*main_elementresize_handler*/ ctx[2].bind(main));
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const currentpage_changes = {};
			if (dirty & /*w*/ 1) currentpage_changes.w = /*w*/ ctx[0];
			if (dirty & /*h*/ 2) currentpage_changes.h = /*h*/ ctx[1];
			currentpage.$set(currentpage_changes);
		},
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
			if (detaching) detach_dev(main);
			destroy_component(header);
			destroy_component(currentpage);
			main_resize_listener();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$7.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$7($$self, $$props, $$invalidate) {
	reLoad();
	let w, h;
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$3.warn(`<App> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("App", $$slots, []);

	function main_elementresize_handler() {
		w = this.clientWidth;
		h = this.clientHeight;
		$$invalidate(0, w);
		$$invalidate(1, h);
	}

	$$self.$capture_state = () => ({ Header, CurrentPage, reLoad, w, h });

	$$self.$inject_state = $$props => {
		if ("w" in $$props) $$invalidate(0, w = $$props.w);
		if ("h" in $$props) $$invalidate(1, h = $$props.h);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*w, h*/ 3) {
			// const testTypes = [{ kg: 1, price: 20 }, { kg: 3, price: 40 }, { kg: 2, price: 60 }, { kg: 5, price: 80 }, { kg: 4, price: 50 }]
			// getMaxValue(carrotTypes,36);
			// getMaxValue(testTypes, 35);
			 console.log("main w and h: ", w, " ", h);
		}
	};

	return [w, h, main_elementresize_handler];
}

class App extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "App",
			options,
			id: create_fragment$7.name
		});
	}
}

if ("serviceWorker" in navigator) {
	window.addEventListener("load", function () {
		navigator.serviceWorker
			.register("serviceWorker.js")
			.then(res => console.log("service worker registered"))
			.catch(err => console.log("service worker not registered", err));
	});
}

const app = new App({
	target: document.body,
	props: {
		
	}
});

export default app;
//# sourceMappingURL=main.js.map
