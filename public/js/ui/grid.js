define(function(require, exports, module) {
    var pager = require('ui/pager');
    /**
     * grid-head
     * grid-body
     * grid-foot for pager
     * onSelected
     *   cols:[]
     */
    return function(config) {
        return UI($.extend(true, {
            checkbox: false,
            status: function(total, page, count) {
                return '共 ' + total + ' 条数据';
            },
            parseData: function(data) {
                return data.result;
            },
            cache: null, //列表数据
            //一些回调
            onSelected: $.noop,
            afterLoad: $.noop,
            onOrderChange: $.noop,
            baseparams: {},
            events: {
                //hover
                'mouseenter .grid-row': function(e, config) {
                    $(this).addClass('grid-hover')
                },
                'mouseleave .grid-row': function(e, config) {
                    $(this).removeClass('grid-hover')
                },
                //选择行
                'click .grid-row': function(e, config) {
                    var others;
                    if (!event.ctrlKey) {
                        var tar = $(event.target || event.srcElement);
                        //IE10- event.target=undefined
                        if (!tar.hasClass('grid-check') && !tar.parent().hasClass('grid-check')) {
                            others = $(this).siblings('.grid-selected').removeClass('grid-selected').length > 0;
                        }
                    }
                    $(this).toggleClass('grid-selected', others || undefined);
                    config.isSelectAll(others ? false : undefined);
                    config.onSelected(config.getSelected());
                },
                //选择行
                'mouseup .grid-row': function(e, conf) {
                    if (e.which == 3) {
                        if (!$(this).hasClass('grid-selected')) {
                            $(this).addClass('grid-selected').siblings().removeClass('grid-selected');
                            conf.onSelected(conf.getSelected());
                        }
                        //右键菜单
                        if (conf.contextmenu) {
                            conf.contextmenu.render(e.pageX, e.pageY);
                        }
                    }

                },
                //全选
                'click .grid-check-all': function(e, config) {
                    var parent = $(this).parent().toggleClass('grid-selected'),
                        isAll = parent.hasClass('grid-selected');
                    config.body.children().toggleClass('grid-selected', isAll);
                    config.onSelected(isAll ? config.cache : []);
                },
                //排序 orderby-asc 升序 orderby-desc 降序
                'click .orderby': function(e, config) {
                    var t = $(this),
                        order = 'asc';
                    if (t.hasClass('desc')) {
                        t.removeClass('desc');
                    } else if (t.hasClass('asc')) {
                        order = 'desc';
                        t.addClass('desc');
                    } else {
                        t.addClass('asc');
                    }
                    //去除其余列图标
                    t.siblings().removeClass('asc desc');
                    _.extend(config.baseparams, {
                        orderby: t.attr('orderby'),
                        order: order
                    });
                    config.onOrderChange();
                    config.load();
                }
            },
            resetOrder: function(conf) {
                var orderClass, baseparams = this.baseparams;
                baseparams.orderby = conf.orderby;
                if (conf.order === undefined) {
                    baseparams.order = conf.order;
                } else if (conf.order === 'desc') {
                    orderClass = 'asc desc';
                    baseparams.order = 'desc';
                } else {
                    baseparams.order = orderClass = 'asc';
                }
                this.loader.page = 1;
                var sort = this.head.children('.orderby').removeClass('asc desc');
                orderClass && sort.filter('[orderby=' + conf.orderby + ']').addClass(orderClass);
                this.load();
            },
            //检查是否全选了
            isSelectAll: function(sta) {
                if (sta === undefined) {
                    sta = this.body.children(':not(.grid-selected)').length == 0;
                }
                this.head.toggleClass('grid-selected', sta);
            },
            //检查滚动条
            isScrolling: function() {
                var b = this.body[0];
                this.head.css('margin-right', b.offsetWidth - b.scrollWidth);
            },
            //获取数据
            getSelected: function() {
                var ret = [],
                    cache = this.cache;
                this.body.children('.grid-selected').each(function(o, i) {
                    var index = this.getAttribute('index');
                    ret.push(cache[index]);
                });
                return ret;
            },
            //调整高度以适应窗体
            layout: function() {
                this.body.height((_.isFunction(this.height) ? this.height(this.el) : this.height) - this.head[0].offsetHeight - this.foot.height());
                this.isScrolling();
            },
            templates: {
                head: _.dot('<div class="grid-head">\
        			{{?it.checkbox}}<div class="grid-col grid-check grid-check-all"><i></i></div>{{?}}\
        			{{~it.cols :col:i}}\
        			<div class="grid-col c{{=i}} {{=col.cls||""}} {{=col.orderby?"orderby":""}}"{{?col.orderby}} orderby="{{=col.orderby}}"{{?}}{{?col.style}} style="{{=col.style}}"{{?}}>{{=col.title||"&nbsp;"}}{{?col.orderby}} <i class="order-tip" orderby="{{=col.orderby}}"></i>{{?}}</div>\
        			{{~}}\
        			</div>'),
                items: _.dot('{{~it.data :trdata:index}}\
        			<div class="grid-row" index="{{=index}}">\
        			{{?it.checkbox}}<div class="grid-col grid-check"><i></i></div>{{?}}\
        			{{~it.cols :col:i}}\
            		<div class="grid-col c{{=i}} {{=col.cls||""}}" {{?col.style}}style="{{=col.style}}"{{?}}>{{=trdata[i]===undefined||trdata[i]===null?"":trdata[i]}}</div>\
        			{{~}}\
        			</div>\
        			{{~}}')
            },
            load: function(filter) {
                this.loader.load(filter);
            },
            init: function() {
                var config = this,
                    uid = _.uniqueId('grid');
                this.el.addClass('grid');
                //head
                this.head = $(this.templates.head(this));
                //body
                this.body = $('<div class="grid-body" id="' + uid + '"></div>');
                //foot
                this.foot = $('<div class="grid-foot"><span class="grid-statu"></span><div class="pager"></div></div>');
                this.statubar = this.foot.find('.grid-statu');
                //loader and pager
                var paging = this.pager = pager({
                    el: this.foot.find('.pager'),
                    onPageClick: function(e, page) {
                        loader.page = page;
                        loader.load();
                    }
                });
                if (!this.count) paging.el.hide();

                var loader = this.loader = UI.loader({
                    baseparams: config.baseparams,
                    count: config.count,
                    url: config.url,
                    cache: config.ajaxCache,
                    afterLoad: function(data) {
                        var cache = config.cache = config.parseData(data) || [];
                        //如果page不是第一页但是返回数据为0，则自动刷新到前一页
                        if (cache.length === 0 && this.page > 1) {
                            this.page = this.page - 1;
                            this.load();
                            return;
                        }
                        config.data = config.render(cache);
                        config.body.html(config.templates.items(config));
                        //paging
                        if (config.count) {
                            paging.render(data.total, loader.page, loader.count);
                        }
                        //状态
                        config.statubar.html(config.status(data.total, loader.page, loader.count) || '');
                        //去除全选状态
                        config.isSelectAll(false);
                        //检查滚动条
                        config.isScrolling();
                        //grid 回调
                        config.afterLoad(data, cache);
                        config.onSelected([]);
                    }
                });
                //build
                this.el.empty().append(this.head).append(this.body).append(this.foot);
                //setHeight
                if (config.height) {
                    this.body.addClass('scroll');
                    if (_.isFunction(config.height)) {
                        var _resize = function() {
                                if (!document.getElementById(uid)) {
                                    $(window).off('resize', _resizeDefer);
                                } else {
                                    config.layout();
                                }
                            },
                            _resizeDefer = _.throttle(_resize, 500, {
                                leading: false
                            });
                        $(window).resize(_resizeDefer);
                        _resize();
                    } else {
                        this.layout();
                    }
                }

                //右键菜单
                if (this.contextmenu) {
                    //禁止body右键菜单
                    this.contextmenu = UI(_.defaults({
                        el: $('<div class="dropdown">'),
                        mask: $('<div class="mask"/>'),
                        render: function(x, y) {
                            var lis = '';
                            _.each(this.menus, function(o, i) {
                                if (o == '') {
                                    lis += '<li class="devider"></li>';
                                } else if (!o.test || _.isFunction(o.test) && o.test() === true) {
                                    lis += '<li><a' + (o.cls ? ' class="' + o.cls + '"' : '') + ' href="' + (_.isFunction(o.href) ? o.href() : o.href || '#') + '">' + o.label + '</a></li>';
                                }
                            });
                            this.mask.show().appendTo('body');
                            this.el.html('<ul class="menu">' + lis + '</ul>').show().appendTo('body').position({
                                at: 'left+' + x + ' top+' + y,
                                my: 'left top',
                                collision: 'flipfit',
                                of: window
                            });
                        },
                        init: function() {
                            var mask = this.mask.on('mousedown', function(e) {
                                    e.stopPropagation();
                                    all.detach();
                                }),
                                el = this.el.on('click', 'a', function(e) {
                                    e.stopPropagation();
                                    all.detach();
                                }),
                                all = mask.add(el);
                            all.add(config.body).on('contextmenu', function() {
                                return false;
                            });
                        }
                    }, this.contextmenu));
                }

            }
        }, config));
    };
});