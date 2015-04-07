/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'f-cut': '&#xe617;',
		'f-export': '&#xe609;',
		'f-gear': '&#xe60a;',
		'f-history': '&#xe60b;',
		'f-see': '&#xe60d;',
		'f-unsee': '&#xe60e;',
		'f-chart': '&#xe60f;',
		'f-chat': '&#xe610;',
		'f-msg': '&#xe611;',
		'f-block': '&#xe612;',
		'f-tag': '&#xe614;',
		'f-more': '&#xe615;',
		'f-bell': '&#xe616;',
		'f-read': '&#xe606;',
		'f-doc': '&#xf1c2;',
		'f-xls': '&#xf1c3;',
		'f-ppt': '&#xf1c4;',
		'f-fly': '&#xf1d9;',
		'f-save': '&#xf0c7;',
		'f-grid': '&#xf009;',
		'f-down': '&#xe604;',
		'f-up': '&#xe605;',
		'f-txt': '&#xe086;',
		'f-copy': '&#xe091;',
		'f-location': '&#xe608;',
		'f-home': '&#xe002;',
		'f-browse': '&#xe0a2;',
		'f-user': '&#xe199;',
		'f-star-empty': '&#xe2ff;',
		'f-star': '&#xe301;',
		'f-pencil': '&#xe600;',
		'f-filter': '&#xe443;',
		'f-warn': '&#xe601;',
		'f-calendar': '&#xe603;',
		'f-share': '&#xe48c;',
		'f-org': '&#xe9bc;',
		'f-shutdown': '&#xe9b6;',
		'f-menus': '&#xf05e;',
		'f-add': '&#xe63a;',
		'f-minus': '&#xe63c;',
		'f-multiply': '&#xe60c;',
		'f-checkmark': '&#xe62e;',
		'f-bin': '&#xf014;',
		'f-search': '&#xe607;',
		'f-tool': '&#xe991;',
		'f-info': '&#xe62b;',
		'f-question': '&#xe640;',
		'f-alert': '&#xe950;',
		'f-buy': '&#xe639;',
		'f-denied': '&#xe602;',
		'f-loop': '&#xea2e;',
		'f-turnr': '&#xe613;',
		'f-print': '&#xe954;',
		'f-undo': '&#xe967;',
		'f-lock': '&#xf06a;',
		'f-unlock': '&#xe990;',
		'f-attachment': '&#xe9cd;',
		'f-link': '&#xf05c;',
		'f-download': '&#xe9c7;',
		'f-upload': '&#xe9c8;',
		'f-list': '&#xf00b;',
		'f-arb': '&#xf0d7;',
		'f-art': '&#xf0d8;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/f-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());