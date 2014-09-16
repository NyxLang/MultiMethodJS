/**
 * multi_method
 * @module MultiMethodJS
 * @version 1.0
 * @copyright (c) 2014 xianrenb at gmail dot com
 * @license http://opensource.org/licenses/MIT
 */
/*jslint nomen: true, plusplus: true, vars: true, browser: true */
/*properties
    apply, arg_type_array, create_prototype, hasOwnProperty, isArray, length,
    method_body, multi_method, prototype, push, split, toString
*/
(function (global) {
    'use strict';
    var call_function, create_prototype, function_dict, multi_method;

    call_function = function (name, that, arg_array) {
        var arg_count, arg_type_array, i, j, match, method_body, method_definition, method_definition_array, method_definition_count, type_of_arg;

        if (!function_dict.hasOwnProperty(name.toString())) {
            throw new ReferenceError();
        }

        method_definition_array = function_dict[name.toString()];
        method_definition_count = method_definition_array.length;
        arg_count = arg_array.length;

        for (i = method_definition_count - 1; i >= 0; i--) {
            match = false;
            method_definition = method_definition_array[i];
            arg_type_array = method_definition.arg_type_array;

            if (arg_type_array.length === arg_count) {
                match = true;

                for (j = 0; j < arg_count; j++) {
                    if (typeof arg_type_array[j] === 'string') {
                        type_of_arg = typeof arg_array[j];

                        if (arg_type_array[j].toString() !== type_of_arg.toString()) {
                            match = false;
                            break;
                        }
                    } else {
                        if (!(arg_array[j] instanceof arg_type_array[j])) {
                            match = false;
                            break;
                        }
                    }
                }
            }

            if (match) {
                method_body = method_definition.method_body;
                return method_body.apply(that, arg_array);
            }
        }

        throw new ReferenceError('No matching method.');
    };

    /**
     * 
     * @global
     * @function create_prototype
     * @param {Object} proto
     * @returns {Object}
     */
    create_prototype = function (proto) {
        var Ctor = function () {
            return this;
        };

        Ctor.prototype = proto;
        return new Ctor();
    };

    /**
     * 
     * @global
     * @function multi_method
     * @param {String} name
     * @param {Array} arg_type_array
     * @param {Function} method_body
     * @returns {undefined}
     */
    multi_method = function (name, arg_type_array, method_body) {
        var arg_type_count, i, j, match, method_definition, method_definition_array, name_splits, name_splits_count, namespace, old_arg_type_array, old_method_definition, old_method_definition_array, old_method_definition_count;

        if (typeof name !== 'string') {
            throw new TypeError('"name" should be a string.');
        }

        if (!Array.isArray(arg_type_array)) {
            throw new TypeError('"arg_type_array" should be an array.');
        }

        if (typeof method_body !== 'function') {
            throw new TypeError('"method_body" should be a function.');
        }

        namespace = global;
        name_splits = name.toString().split('.');
        name_splits_count = name_splits.length;

        for (i = 0; i < name_splits_count - 1; ++i) {
            if (!namespace.hasOwnProperty(name_splits[i].toString())) {
                namespace[name_splits[i].toString()] = {};
            }

            namespace = namespace[name_splits[i].toString()];
        }

        if (!namespace.hasOwnProperty(name_splits[name_splits_count - 1].toString())) {
            namespace[name_splits[name_splits_count - 1].toString()] = function () {
                return call_function(name.toString(), this, arguments);
            };
        }

        if (function_dict.hasOwnProperty(name.toString())) {
            old_method_definition_array = function_dict[name.toString()];
        } else {
            old_method_definition_array = [];
        }

        method_definition = {
            'arg_type_array' : arg_type_array,
            'method_body' : method_body
        };

        function_dict[name.toString()] = [];
        method_definition_array = function_dict[name.toString()];
        old_method_definition_count = old_method_definition_array.length;
        arg_type_count = arg_type_array.length;

        for (i = 0; i < old_method_definition_count; i++) {
            match = false;
            old_method_definition = old_method_definition_array[i];
            old_arg_type_array = old_method_definition.arg_type_array;

            if (old_arg_type_array.length === arg_type_count) {
                match = true;

                for (j = 0; j < arg_type_count; j++) {
                    if (old_arg_type_array[j] !== arg_type_array[j]) {
                        match = false;
                        break;
                    }
                }
            }

            if (!match) {
                method_definition_array.push(old_method_definition);
            }
        }

        method_definition_array.push(method_definition);
    };

    function_dict = {};
    global.create_prototype = create_prototype;
    global.multi_method = multi_method;
}(this));
