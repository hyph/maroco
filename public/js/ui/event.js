define("js/ui/event",[],{on:function(t,e,n){this._events||(this._events={});var s=this._events[t]||(this._events[t]=[]);return s.push({callback:e,context:n,ctx:n||this}),this},one:function(t,e,n){var s=this,i=_.once(function(){s.off(t,i),e.apply(this,arguments)});return i._callback=e,this.on(t,i,n)},off:function(t,e,n){var s,i,h,c,r,a,l,v;if(!this._events)return this;if(!t&&!e&&!n)return this._events=void 0,this;for(c=t?[t]:_.keys(this._events),r=0,a=c.length;a>r;r++)if(t=c[r],h=this._events[t]){if(this._events[t]=s=[],e||n)for(l=0,v=h.length;v>l;l++)i=h[l],(e&&e!==i.callback&&e!==i.callback._callback||n&&n!==i.context)&&s.push(i);s.length||delete this._events[t]}return this},trigger:function(t){return this._events?(_.each(this._events[t],function(t,e){t.callback.apply(ev.ctx,arguments)}),this):this}});