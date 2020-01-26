
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
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
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
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

    const globals = (typeof window !== 'undefined' ? window : global);

    function destroy_block(block, lookup) {
        block.d(1);
        lookup.delete(block.key);
    }
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
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
    const tmpCont = writable({id:"",name:"",type:"",items:[]});
    const unSaved = writable({ id: "", name: "", type: "", items: [""] });

    function reLoad() {
        myContainers.set(getList("myStuff"));
        mypage.set(getLastPage("lastPage"));
        unSaved.set(getList("unSaved"));
    }

    // Editing any Container Function
    function editCont(name,type,items,id) {
        console.log("tmpContis: " + name);
        $: console.log(tmpCont);
        tmpCont.set({
            name: name,
            type: type,
            items: items,
            id: id
        });


    }

    function addContainer(nname,ntype,nitems){
        myContainers.update(existing => [...existing, {
            id: existing.length + Math.random(),
            name: nname,
            type: ntype,
            items: nitems
        }]

        );
        setList(get_store_value(myContainers),"myStuff");
        setList({ id: "", name: "", type: "", items: [""] },"unSaved");
    }

    function toggle(msg) {
        if (msg === "main") {
            mypage.set("main");
            setLastPage(msg);
            reLoad();
            return;
        }
        if (msg === "newlist") {
            mypage.set("newlist");
            setLastPage(msg);
            return;
        }
        if (msg === "editlist") {
            mypage.set("editlist");
            setLastPage(msg);
            return;
        }


        mypage.set("newlist");
        setLastPage(msg);
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
    			attr_dev(button, "class", "svelte-1ubnyt2");
    			add_location(button, file, 20, 0, 309);
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

    /* src/components/Create.svelte generated by Svelte v3.12.1 */
    const { console: console_1 } = globals;

    const file$1 = "src/components/Create.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.item = list[i];
    	child_ctx.each_value = list;
    	child_ctx.i = i;
    	return child_ctx;
    }

    // (90:16) {#if i != 0}
    function create_if_block(ctx) {
    	var button, dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "-";
    			attr_dev(button, "class", "svelte-xcf55r");
    			add_location(button, file$1, 90, 16, 2070);
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
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_if_block.name, type: "if", source: "(90:16) {#if i != 0}", ctx });
    	return block;
    }

    // (86:8) {#each items as item, i (i)}
    function create_each_block(key_1, ctx) {
    	var div, input, t0, t1, button, dispose;

    	function input_input_handler() {
    		ctx.input_input_handler.call(input, ctx);
    	}

    	var if_block = (ctx.i != 0) && create_if_block(ctx);

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
    			attr_dev(input, "placeholder", ctx.inputMsg);
    			attr_dev(input, "class", "svelte-xcf55r");
    			add_location(input, file$1, 87, 16, 1926);
    			attr_dev(button, "class", "svelte-xcf55r");
    			add_location(button, file$1, 92, 16, 2159);
    			attr_dev(div, "class", "itemslist svelte-xcf55r");
    			add_location(div, file$1, 86, 12, 1886);

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
    		},

    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if (changed.items && (input.value !== ctx.item)) set_input_value(input, ctx.item);

    			if (changed.inputMsg) {
    				attr_dev(input, "placeholder", ctx.inputMsg);
    			}

    			if (ctx.i != 0) {
    				if (if_block) {
    					if_block.p(changed, ctx);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(div, t1);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}

    			if (if_block) if_block.d();
    			run_all(dispose);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_each_block.name, type: "each", source: "(86:8) {#each items as item, i (i)}", ctx });
    	return block;
    }

    function create_fragment$1(ctx) {
    	var div, t0, label, input0, t1, input1, t2, each_blocks = [], each_1_lookup = new Map(), t3, button, dispose;

    	let each_value = ctx.items;

    	const get_key = ctx => ctx.i;

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text("Create Your Container\n    ");
    			label = element("label");
    			input0 = element("input");
    			t1 = space();
    			input1 = element("input");
    			t2 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			button = element("button");
    			button.textContent = "Done";
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "name", "name");
    			attr_dev(input0, "placeholder", "The Container Name");
    			attr_dev(input0, "class", "svelte-xcf55r");
    			add_location(input0, file$1, 80, 8, 1629);
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "name", "type");
    			attr_dev(input1, "placeholder", "The Container Type");
    			attr_dev(input1, "class", "svelte-xcf55r");
    			add_location(input1, file$1, 82, 8, 1734);
    			attr_dev(button, "class", "svelte-xcf55r");
    			add_location(button, file$1, 96, 8, 2256);
    			attr_dev(label, "class", "svelte-xcf55r");
    			add_location(label, file$1, 79, 4, 1613);
    			attr_dev(div, "classname", "create-new");
    			attr_dev(div, "class", "svelte-xcf55r");
    			add_location(div, file$1, 77, 0, 1554);

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
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, label);
    			append_dev(label, input0);

    			set_input_value(input0, ctx.name);

    			append_dev(label, t1);
    			append_dev(label, input1);

    			set_input_value(input1, ctx.type);

    			append_dev(label, t2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(label, null);
    			}

    			append_dev(label, t3);
    			append_dev(label, button);
    		},

    		p: function update(changed, ctx) {
    			if (changed.name && (input0.value !== ctx.name)) set_input_value(input0, ctx.name);
    			if (changed.type && (input1.value !== ctx.type)) set_input_value(input1, ctx.type);

    			const each_value = ctx.items;
    			each_blocks = update_keyed_each(each_blocks, changed, get_key, 1, ctx, each_value, each_1_lookup, label, destroy_block, create_each_block, t3, get_each_context);
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			run_all(dispose);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$1.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { name = "", type = "", items = [""] } = $$props;
        

        let inputMsg = "Start adding items to your container!";

        function handleSubmit(){
            //TODO: use JSON to save data to localStorage
            addContainer(name,type,items);

            console.log("handleSubmitted");
            toggle("main");
        }

        function newItem(itm){
            $$invalidate('items', items[items.length-1] = itm, items);
            $$invalidate('items', items = [...items, ""]);
            
        }

        function remItem(index) {
            console.log(index+ " th item deleted");
            $$invalidate('items', items = items.filter((i,idx) => { return idx !== index;
            }));
        }

    	const writable_props = ['name', 'type', 'items'];
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

    	$$self.$set = $$props => {
    		if ('name' in $$props) $$invalidate('name', name = $$props.name);
    		if ('type' in $$props) $$invalidate('type', type = $$props.type);
    		if ('items' in $$props) $$invalidate('items', items = $$props.items);
    	};

    	$$self.$capture_state = () => {
    		return { name, type, items, inputMsg };
    	};

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate('name', name = $$props.name);
    		if ('type' in $$props) $$invalidate('type', type = $$props.type);
    		if ('items' in $$props) $$invalidate('items', items = $$props.items);
    		if ('inputMsg' in $$props) $$invalidate('inputMsg', inputMsg = $$props.inputMsg);
    	};

    	$$self.$$.update = ($$dirty = { items: 1, name: 1, type: 1 }) => {
    		if ($$dirty.items) { if(items.length > 1){ $$invalidate('inputMsg', inputMsg= "And another one");} }
    		if ($$dirty.name || $$dirty.type || $$dirty.items) { {
                    console.log(name+ ':'+type+':'+items);
                    setList({name: name, type: type, items: items},"unSaved");
                } }
    		if ($$dirty.items) { {
                    console.log(items.length+" items:"+items);
                } }
    	};

    	return {
    		name,
    		type,
    		items,
    		inputMsg,
    		handleSubmit,
    		newItem,
    		remItem,
    		input0_input_handler,
    		input1_input_handler,
    		input_input_handler,
    		click_handler
    	};
    }

    class Create extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, ["name", "type", "items"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Create", options, id: create_fragment$1.name });
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
    }

    /* src/components/NewButton.svelte generated by Svelte v3.12.1 */

    const file$2 = "src/components/NewButton.svelte";

    // (32:32) 
    function create_if_block_1(ctx) {
    	var button_1;

    	const block = {
    		c: function create() {
    			button_1 = element("button");
    			button_1.textContent = "Edit";
    			attr_dev(button_1, "class", "edit-button svelte-lr6vmk");
    			add_location(button_1, file$2, 32, 0, 726);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, button_1, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(button_1);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_if_block_1.name, type: "if", source: "(32:32) ", ctx });
    	return block;
    }

    // (30:0) {#if button === 'newlist'}
    function create_if_block$1(ctx) {
    	var button_1, dispose;

    	const block = {
    		c: function create() {
    			button_1 = element("button");
    			button_1.textContent = "+";
    			attr_dev(button_1, "id", "menu-edit-create");
    			attr_dev(button_1, "class", "svelte-lr6vmk");
    			add_location(button_1, file$2, 30, 0, 617);
    			dispose = listen_dev(button_1, "click", ctx.click_handler);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, button_1, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(button_1);
    			}

    			dispose();
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_if_block$1.name, type: "if", source: "(30:0) {#if button === 'newlist'}", ctx });
    	return block;
    }

    function create_fragment$2(ctx) {
    	var if_block_anchor;

    	function select_block_type(changed, ctx) {
    		if (ctx.button === 'newlist') return create_if_block$1;
    		if (ctx.button === 'editlist') return create_if_block_1;
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
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$2.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, ["button"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "NewButton", options, id: create_fragment$2.name });

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

    const file$3 = "src/components/Container.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.item = list[i];
    	child_ctx.i = i;
    	return child_ctx;
    }

    // (58:27) {:else}
    function create_else_block(ctx) {
    	var t;

    	const block = {
    		c: function create() {
    			t = text("Hide");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(t);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_else_block.name, type: "else", source: "(58:27) {:else}", ctx });
    	return block;
    }

    // (58:12) {#if isSum}
    function create_if_block_1$1(ctx) {
    	var t;

    	const block = {
    		c: function create() {
    			t = text("Show");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(t);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_if_block_1$1.name, type: "if", source: "(58:12) {#if isSum}", ctx });
    	return block;
    }

    // (66:8) {#if !isSum}
    function create_if_block$2(ctx) {
    	var t, div;

    	let each_value = ctx.items;

    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			t = text(":\n        ");
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}
    			attr_dev(div, "class", "item-list svelte-1cb7c69");
    			add_location(div, file$3, 66, 8, 1470);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},

    		p: function update(changed, ctx) {
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
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}
    				each_blocks.length = each_value.length;
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(t);
    				detach_dev(div);
    			}

    			destroy_each(each_blocks, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_if_block$2.name, type: "if", source: "(66:8) {#if !isSum}", ctx });
    	return block;
    }

    // (68:12) {#each items as item,i}
    function create_each_block$1(ctx) {
    	var t0, t1_value = ctx.item + "", t1, br;

    	const block = {
    		c: function create() {
    			t0 = text("*");
    			t1 = text(t1_value);
    			br = element("br");
    			add_location(br, file$3, 68, 23, 1553);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, br, anchor);
    		},

    		p: function update(changed, ctx) {
    			if ((changed.items) && t1_value !== (t1_value = ctx.item + "")) {
    				set_data_dev(t1, t1_value);
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(t0);
    				detach_dev(t1);
    				detach_dev(br);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_each_block$1.name, type: "each", source: "(68:12) {#each items as item,i}", ctx });
    	return block;
    }

    function create_fragment$3(ctx) {
    	var div1, div0, input, t0, t1, t2, t3, t4, br0, t5, t6, t7, br1, t8, t9, t10, t11, current, dispose;

    	function select_block_type(changed, ctx) {
    		if (ctx.isSum) return create_if_block_1$1;
    		return create_else_block;
    	}

    	var current_block_type = select_block_type(null, ctx);
    	var if_block0 = current_block_type(ctx);

    	var if_block1 = (!ctx.isSum) && create_if_block$2(ctx);

    	var newbutton = new NewButton({
    		props: { button: "editlist" },
    		$$inline: true
    	});
    	newbutton.$on("click", ctx.click_handler);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			input = element("input");
    			t0 = space();
    			if_block0.c();
    			t1 = text(" details");
    			t2 = text("\n        Name: ");
    			t3 = text(ctx.name);
    			t4 = space();
    			br0 = element("br");
    			t5 = text("\n        Type: ");
    			t6 = text(ctx.type);
    			t7 = space();
    			br1 = element("br");
    			t8 = space();
    			t9 = text(ctx.itemsnum);
    			t10 = text(" Stuff here\n        \n        ");
    			if (if_block1) if_block1.c();
    			t11 = space();
    			newbutton.$$.fragment.c();
    			attr_dev(input, "type", "checkbox");
    			add_location(input, file$3, 56, 12, 1220);
    			attr_dev(div0, "id", "details");
    			attr_dev(div0, "class", "svelte-1cb7c69");
    			add_location(div0, file$3, 55, 8, 1189);
    			add_location(br0, file$3, 60, 8, 1362);
    			add_location(br1, file$3, 62, 8, 1396);
    			attr_dev(div1, "class", "containersum svelte-1cb7c69");
    			add_location(div1, file$3, 54, 4, 1154);
    			dispose = listen_dev(input, "click", ctx.details);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, input);
    			append_dev(div0, t0);
    			if_block0.m(div0, null);
    			append_dev(div0, t1);
    			append_dev(div1, t2);
    			append_dev(div1, t3);
    			append_dev(div1, t4);
    			append_dev(div1, br0);
    			append_dev(div1, t5);
    			append_dev(div1, t6);
    			append_dev(div1, t7);
    			append_dev(div1, br1);
    			append_dev(div1, t8);
    			append_dev(div1, t9);
    			append_dev(div1, t10);
    			if (if_block1) if_block1.m(div1, null);
    			append_dev(div1, t11);
    			mount_component(newbutton, div1, null);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (current_block_type !== (current_block_type = select_block_type(changed, ctx))) {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);
    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(div0, t1);
    				}
    			}

    			if (!current || changed.name) {
    				set_data_dev(t3, ctx.name);
    			}

    			if (!current || changed.type) {
    				set_data_dev(t6, ctx.type);
    			}

    			if (!current || changed.itemsnum) {
    				set_data_dev(t9, ctx.itemsnum);
    			}

    			if (!ctx.isSum) {
    				if (if_block1) {
    					if_block1.p(changed, ctx);
    				} else {
    					if_block1 = create_if_block$2(ctx);
    					if_block1.c();
    					if_block1.m(div1, t11);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(newbutton.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(newbutton.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div1);
    			}

    			if_block0.d();
    			if (if_block1) if_block1.d();

    			destroy_component(newbutton);

    			dispose();
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$3.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	

        let { id = "", name = "TestName", type = "TestType", items = ["sugar"], itemsnum = items.length, isSum = true } = $$props;



        function details() {
                $$invalidate('isSum', isSum = !isSum);
            }

    	const writable_props = ['id', 'name', 'type', 'items', 'itemsnum', 'isSum'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<Container> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => editCont(this.name, this.type, this.items, this.id);

    	$$self.$set = $$props => {
    		if ('id' in $$props) $$invalidate('id', id = $$props.id);
    		if ('name' in $$props) $$invalidate('name', name = $$props.name);
    		if ('type' in $$props) $$invalidate('type', type = $$props.type);
    		if ('items' in $$props) $$invalidate('items', items = $$props.items);
    		if ('itemsnum' in $$props) $$invalidate('itemsnum', itemsnum = $$props.itemsnum);
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
    		details,
    		click_handler
    	};
    }

    class Container extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, ["id", "name", "type", "items", "itemsnum", "isSum"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Container", options, id: create_fragment$3.name });
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

    	get itemsnum() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set itemsnum(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isSum() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isSum(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/ContainerSum.svelte generated by Svelte v3.12.1 */

    const file$4 = "src/components/ContainerSum.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.container = list[i];
    	child_ctx.i = i;
    	return child_ctx;
    }

    // (15:4) {:else}
    function create_else_block$1(ctx) {
    	var t0, br, t1;

    	const block = {
    		c: function create() {
    			t0 = text("Welcome to MyStuff! Start adding Containers to the app using the plus button so you\n        can keep track of stuff you have, even when you forgot the app remembers!\n        ");
    			br = element("br");
    			t1 = text("\n        This app saves all data to your local store so all your data is on your device.");
    			add_location(br, file$4, 17, 8, 558);
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
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_else_block$1.name, type: "else", source: "(15:4) {:else}", ctx });
    	return block;
    }

    // (10:4) {#each get(myContainers) as container, i (container.id)}
    function create_each_block$2(key_1, ctx) {
    	var t0, t1_value = ctx.i+1 + "", t1, t2, current;

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
    			t0 = text("#");
    			t1 = text(t1_value);
    			t2 = space();
    			container.$$.fragment.c();
    			this.first = t0;
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, t2, anchor);
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
    				detach_dev(t0);
    				detach_dev(t1);
    				detach_dev(t2);
    			}

    			destroy_component(container, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_each_block$2.name, type: "each", source: "(10:4) {#each get(myContainers) as container, i (container.id)}", ctx });
    	return block;
    }

    function create_fragment$4(ctx) {
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
    		each_1_else = create_else_block$1(ctx);
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
    				each_1_else = create_else_block$1(ctx);
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
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$4.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$4($$self) {
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
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "ContainerSum", options, id: create_fragment$4.name });
    	}
    }

    /* src/CurrentPage.svelte generated by Svelte v3.12.1 */

    // (28:0) {:else}
    function create_else_block$2(ctx) {
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
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_else_block$2.name, type: "else", source: "(28:0) {:else}", ctx });
    	return block;
    }

    // (21:33) 
    function create_if_block_1$2(ctx) {
    	var current;

    	var create = new Create({
    		props: {
    		name: ctx.$tmpCont.name,
    		type: ctx.$tmpCont.type,
    		items: ctx.$tmpCont.items
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
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_if_block_1$2.name, type: "if", source: "(21:33) ", ctx });
    	return block;
    }

    // (13:0) {#if $mypage === "newlist"}
    function create_if_block$3(ctx) {
    	var current;

    	var create = new Create({
    		props: {
    		name: ctx.$unSaved.name,
    		type: ctx.$unSaved.type,
    		items: ctx.$unSaved.items
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

    function create_fragment$5(ctx) {
    	var current_block_type_index, if_block, if_block_anchor, current;

    	var if_block_creators = [
    		create_if_block$3,
    		create_if_block_1$2,
    		create_else_block$2
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
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$5.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "CurrentPage", options, id: create_fragment$5.name });
    	}
    }

    /* src/App.svelte generated by Svelte v3.12.1 */

    const file$5 = "src/App.svelte";

    function create_fragment$6(ctx) {
    	var main, t, current;

    	var header = new Header({ $$inline: true });

    	var currentpage = new CurrentPage({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			header.$$.fragment.c();
    			t = space();
    			currentpage.$$.fragment.c();
    			attr_dev(main, "class", "svelte-1u78exa");
    			add_location(main, file$5, 27, 0, 518);
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
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$6.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$6($$self) {
    	
    	
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
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "App", options, id: create_fragment$6.name });
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
