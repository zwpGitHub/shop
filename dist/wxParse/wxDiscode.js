'use strict';

// HTML 支持的数学符号

function strNumDiscode(str) {
    str = str.replace(/&forall;/g, '∀');
    str = str.replace(/&part;/g, '∂');
    str = str.replace(/&exists;/g, '∃');
    str = str.replace(/&empty;/g, '∅');
    str = str.replace(/&nabla;/g, '∇');
    str = str.replace(/&isin;/g, '∈');
    str = str.replace(/&notin;/g, '∉');
    str = str.replace(/&ni;/g, '∋');
    str = str.replace(/&prod;/g, '∏');
    str = str.replace(/&sum;/g, '∑');
    str = str.replace(/&minus;/g, '−');
    str = str.replace(/&lowast;/g, '∗');
    str = str.replace(/&radic;/g, '√');
    str = str.replace(/&prop;/g, '∝');
    str = str.replace(/&infin;/g, '∞');
    str = str.replace(/&ang;/g, '∠');
    str = str.replace(/&and;/g, '∧');
    str = str.replace(/&or;/g, '∨');
    str = str.replace(/&cap;/g, '∩');
    str = str.replace(/&cap;/g, '∪');
    str = str.replace(/&int;/g, '∫');
    str = str.replace(/&there4;/g, '∴');
    str = str.replace(/&sim;/g, '∼');
    str = str.replace(/&cong;/g, '≅');
    str = str.replace(/&asymp;/g, '≈');
    str = str.replace(/&ne;/g, '≠');
    str = str.replace(/&le;/g, '≤');
    str = str.replace(/&ge;/g, '≥');
    str = str.replace(/&sub;/g, '⊂');
    str = str.replace(/&sup;/g, '⊃');
    str = str.replace(/&nsub;/g, '⊄');
    str = str.replace(/&sube;/g, '⊆');
    str = str.replace(/&supe;/g, '⊇');
    str = str.replace(/&oplus;/g, '⊕');
    str = str.replace(/&otimes;/g, '⊗');
    str = str.replace(/&perp;/g, '⊥');
    str = str.replace(/&sdot;/g, '⋅');
    return str;
}

//HTML 支持的希腊字母
function strGreeceDiscode(str) {
    str = str.replace(/&Alpha;/g, 'Α');
    str = str.replace(/&Beta;/g, 'Β');
    str = str.replace(/&Gamma;/g, 'Γ');
    str = str.replace(/&Delta;/g, 'Δ');
    str = str.replace(/&Epsilon;/g, 'Ε');
    str = str.replace(/&Zeta;/g, 'Ζ');
    str = str.replace(/&Eta;/g, 'Η');
    str = str.replace(/&Theta;/g, 'Θ');
    str = str.replace(/&Iota;/g, 'Ι');
    str = str.replace(/&Kappa;/g, 'Κ');
    str = str.replace(/&Lambda;/g, 'Λ');
    str = str.replace(/&Mu;/g, 'Μ');
    str = str.replace(/&Nu;/g, 'Ν');
    str = str.replace(/&Xi;/g, 'Ν');
    str = str.replace(/&Omicron;/g, 'Ο');
    str = str.replace(/&Pi;/g, 'Π');
    str = str.replace(/&Rho;/g, 'Ρ');
    str = str.replace(/&Sigma;/g, 'Σ');
    str = str.replace(/&Tau;/g, 'Τ');
    str = str.replace(/&Upsilon;/g, 'Υ');
    str = str.replace(/&Phi;/g, 'Φ');
    str = str.replace(/&Chi;/g, 'Χ');
    str = str.replace(/&Psi;/g, 'Ψ');
    str = str.replace(/&Omega;/g, 'Ω');

    str = str.replace(/&alpha;/g, 'α');
    str = str.replace(/&beta;/g, 'β');
    str = str.replace(/&gamma;/g, 'γ');
    str = str.replace(/&delta;/g, 'δ');
    str = str.replace(/&epsilon;/g, 'ε');
    str = str.replace(/&zeta;/g, 'ζ');
    str = str.replace(/&eta;/g, 'η');
    str = str.replace(/&theta;/g, 'θ');
    str = str.replace(/&iota;/g, 'ι');
    str = str.replace(/&kappa;/g, 'κ');
    str = str.replace(/&lambda;/g, 'λ');
    str = str.replace(/&mu;/g, 'μ');
    str = str.replace(/&nu;/g, 'ν');
    str = str.replace(/&xi;/g, 'ξ');
    str = str.replace(/&omicron;/g, 'ο');
    str = str.replace(/&pi;/g, 'π');
    str = str.replace(/&rho;/g, 'ρ');
    str = str.replace(/&sigmaf;/g, 'ς');
    str = str.replace(/&sigma;/g, 'σ');
    str = str.replace(/&tau;/g, 'τ');
    str = str.replace(/&upsilon;/g, 'υ');
    str = str.replace(/&phi;/g, 'φ');
    str = str.replace(/&chi;/g, 'χ');
    str = str.replace(/&psi;/g, 'ψ');
    str = str.replace(/&omega;/g, 'ω');
    str = str.replace(/&thetasym;/g, 'ϑ');
    str = str.replace(/&upsih;/g, 'ϒ');
    str = str.replace(/&piv;/g, 'ϖ');
    str = str.replace(/&middot;/g, '·');
    return str;
}

// 

function strcharacterDiscode(str) {
    // 加入常用解析
    str = str.replace(/&nbsp;/g, ' ');
    str = str.replace(/&quot;/g, "'");
    str = str.replace(/&amp;/g, '&');
    // str = str.replace(/&lt;/g, '‹');
    // str = str.replace(/&gt;/g, '›');

    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/&#8226;/g, '•');

    return str;
}

// HTML 支持的其他实体
function strOtherDiscode(str) {
    str = str.replace(/&OElig;/g, 'Œ');
    str = str.replace(/&oelig;/g, 'œ');
    str = str.replace(/&Scaron;/g, 'Š');
    str = str.replace(/&scaron;/g, 'š');
    str = str.replace(/&Yuml;/g, 'Ÿ');
    str = str.replace(/&fnof;/g, 'ƒ');
    str = str.replace(/&circ;/g, 'ˆ');
    str = str.replace(/&tilde;/g, '˜');
    str = str.replace(/&ensp;/g, '');
    str = str.replace(/&emsp;/g, '');
    str = str.replace(/&thinsp;/g, '');
    str = str.replace(/&zwnj;/g, '');
    str = str.replace(/&zwj;/g, '');
    str = str.replace(/&lrm;/g, '');
    str = str.replace(/&rlm;/g, '');
    str = str.replace(/&ndash;/g, '–');
    str = str.replace(/&mdash;/g, '—');
    str = str.replace(/&lsquo;/g, '‘');
    str = str.replace(/&rsquo;/g, '’');
    str = str.replace(/&sbquo;/g, '‚');
    str = str.replace(/&ldquo;/g, '“');
    str = str.replace(/&rdquo;/g, '”');
    str = str.replace(/&bdquo;/g, '„');
    str = str.replace(/&dagger;/g, '†');
    str = str.replace(/&Dagger;/g, '‡');
    str = str.replace(/&bull;/g, '•');
    str = str.replace(/&hellip;/g, '…');
    str = str.replace(/&permil;/g, '‰');
    str = str.replace(/&prime;/g, '′');
    str = str.replace(/&Prime;/g, '″');
    str = str.replace(/&lsaquo;/g, '‹');
    str = str.replace(/&rsaquo;/g, '›');
    str = str.replace(/&oline;/g, '‾');
    str = str.replace(/&euro;/g, '€');
    str = str.replace(/&trade;/g, '™');

    str = str.replace(/&larr;/g, '←');
    str = str.replace(/&uarr;/g, '↑');
    str = str.replace(/&rarr;/g, '→');
    str = str.replace(/&darr;/g, '↓');
    str = str.replace(/&harr;/g, '↔');
    str = str.replace(/&crarr;/g, '↵');
    str = str.replace(/&lceil;/g, '⌈');
    str = str.replace(/&rceil;/g, '⌉');

    str = str.replace(/&lfloor;/g, '⌊');
    str = str.replace(/&rfloor;/g, '⌋');
    str = str.replace(/&loz;/g, '◊');
    str = str.replace(/&spades;/g, '♠');
    str = str.replace(/&clubs;/g, '♣');
    str = str.replace(/&hearts;/g, '♥');

    str = str.replace(/&diams;/g, '♦');
    str = str.replace(/&#39;/g, '\'');
    return str;
}

function strMoreDiscode(str) {
    str = str.replace(/\r\n/g, "");
    str = str.replace(/\n/g, "");

    str = str.replace(/code/g, "wxxxcode-style");
    return str;
}

function strDiscode(str) {
    str = strNumDiscode(str);
    str = strGreeceDiscode(str);
    str = strcharacterDiscode(str);
    str = strOtherDiscode(str);
    str = strMoreDiscode(str);
    return str;
}
function urlToHttpUrl(url, rep) {

    var patt1 = new RegExp("^//");
    var result = patt1.test(url);
    if (result) {
        url = rep + ":" + url;
    }
    return url;
}

module.exports = {
    strDiscode: strDiscode,
    urlToHttpUrl: urlToHttpUrl
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd4RGlzY29kZS5qcyJdLCJuYW1lcyI6WyJzdHIiLCJzdHJOdW1EaXNjb2RlIiwic3RyR3JlZWNlRGlzY29kZSIsInN0cmNoYXJhY3RlckRpc2NvZGUiLCJzdHJPdGhlckRpc2NvZGUiLCJzdHJNb3JlRGlzY29kZSIsInBhdHQxIiwicmVzdWx0IiwidXJsIiwicmVwIiwibW9kdWxlIiwic3RyRGlzY29kZSIsInVybFRvSHR0cFVybCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQSxTQUFBLGFBQUEsQ0FBQSxHQUFBLEVBQTJCO0FBQ3ZCQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxXQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxXQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxPQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxRQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxXQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxRQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxRQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxPQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxRQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxRQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxRQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxXQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxRQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxPQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxPQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxPQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxRQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxRQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxXQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBLFdBQUEsR0FBQTtBQUNIOztBQUVEO0FBQ0EsU0FBQSxnQkFBQSxDQUFBLEdBQUEsRUFBOEI7QUFDMUJBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFVBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFNBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFVBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFVBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFlBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFNBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFFBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFVBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFNBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFVBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFdBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLE9BQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLE9BQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLE9BQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFlBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLE9BQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFFBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFVBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFFBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFlBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFFBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFFBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFFBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFVBQUFBLEVBQU5BLEdBQU1BLENBQU5BOztBQUVBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxZQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxRQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxXQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxPQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxPQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxPQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxZQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxPQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxRQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxXQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxRQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxZQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxRQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxRQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxRQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxhQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxRQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxXQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBLFdBQUEsR0FBQTtBQUNIOztBQUVEOztBQUVBLFNBQUEsbUJBQUEsQ0FBQSxHQUFBLEVBQWlDO0FBQzdCO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFNBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFNBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFFBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0E7QUFDQTs7QUFFQUEsVUFBTUEsSUFBQUEsT0FBQUEsQ0FBQUEsT0FBQUEsRUFBTkEsR0FBTUEsQ0FBTkE7QUFDQUEsVUFBTUEsSUFBQUEsT0FBQUEsQ0FBQUEsT0FBQUEsRUFBTkEsR0FBTUEsQ0FBTkE7QUFDQUEsVUFBTUEsSUFBQUEsT0FBQUEsQ0FBQUEsVUFBQUEsRUFBTkEsR0FBTUEsQ0FBTkE7O0FBRUEsV0FBQSxHQUFBO0FBQ0g7O0FBRUQ7QUFDQSxTQUFBLGVBQUEsQ0FBQSxHQUFBLEVBQTZCO0FBQ3pCQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxXQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxXQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxFQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxFQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxXQUFBQSxFQUFOQSxFQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxFQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxRQUFBQSxFQUFOQSxFQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxRQUFBQSxFQUFOQSxFQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxRQUFBQSxFQUFOQSxFQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxXQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxXQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxXQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxXQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxXQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxXQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxTQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTs7QUFFQUEsVUFBTUEsSUFBQUEsT0FBQUEsQ0FBQUEsU0FBQUEsRUFBTkEsR0FBTUEsQ0FBTkE7QUFDQUEsVUFBTUEsSUFBQUEsT0FBQUEsQ0FBQUEsU0FBQUEsRUFBTkEsR0FBTUEsQ0FBTkE7QUFDQUEsVUFBTUEsSUFBQUEsT0FBQUEsQ0FBQUEsU0FBQUEsRUFBTkEsR0FBTUEsQ0FBTkE7QUFDQUEsVUFBTUEsSUFBQUEsT0FBQUEsQ0FBQUEsU0FBQUEsRUFBTkEsR0FBTUEsQ0FBTkE7QUFDQUEsVUFBTUEsSUFBQUEsT0FBQUEsQ0FBQUEsU0FBQUEsRUFBTkEsR0FBTUEsQ0FBTkE7QUFDQUEsVUFBTUEsSUFBQUEsT0FBQUEsQ0FBQUEsVUFBQUEsRUFBTkEsR0FBTUEsQ0FBTkE7QUFDQUEsVUFBTUEsSUFBQUEsT0FBQUEsQ0FBQUEsVUFBQUEsRUFBTkEsR0FBTUEsQ0FBTkE7QUFDQUEsVUFBTUEsSUFBQUEsT0FBQUEsQ0FBQUEsVUFBQUEsRUFBTkEsR0FBTUEsQ0FBTkE7O0FBRUFBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFdBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFdBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFFBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFdBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFVBQUFBLEVBQU5BLEdBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLFdBQUFBLEVBQU5BLEdBQU1BLENBQU5BOztBQUVBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxVQUFBQSxFQUFOQSxHQUFNQSxDQUFOQTtBQUNBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxRQUFBQSxFQUFOQSxJQUFNQSxDQUFOQTtBQUNBLFdBQUEsR0FBQTtBQUNIOztBQUVELFNBQUEsY0FBQSxDQUFBLEdBQUEsRUFBNEI7QUFDeEJBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLE9BQUFBLEVBQU5BLEVBQU1BLENBQU5BO0FBQ0FBLFVBQU1BLElBQUFBLE9BQUFBLENBQUFBLEtBQUFBLEVBQU5BLEVBQU1BLENBQU5BOztBQUVBQSxVQUFNQSxJQUFBQSxPQUFBQSxDQUFBQSxPQUFBQSxFQUFOQSxnQkFBTUEsQ0FBTkE7QUFDQSxXQUFBLEdBQUE7QUFDSDs7QUFFRCxTQUFBLFVBQUEsQ0FBQSxHQUFBLEVBQXdCO0FBQ3BCQSxVQUFNQyxjQUFORCxHQUFNQyxDQUFORDtBQUNBQSxVQUFNRSxpQkFBTkYsR0FBTUUsQ0FBTkY7QUFDQUEsVUFBTUcsb0JBQU5ILEdBQU1HLENBQU5IO0FBQ0FBLFVBQU1JLGdCQUFOSixHQUFNSSxDQUFOSjtBQUNBQSxVQUFNSyxlQUFOTCxHQUFNSyxDQUFOTDtBQUNBLFdBQUEsR0FBQTtBQUNIO0FBQ0QsU0FBQSxZQUFBLENBQUEsR0FBQSxFQUFBLEdBQUEsRUFBOEI7O0FBRTFCLFFBQUlNLFFBQVEsSUFBQSxNQUFBLENBQVosS0FBWSxDQUFaO0FBQ0EsUUFBSUMsU0FBU0QsTUFBQUEsSUFBQUEsQ0FBYixHQUFhQSxDQUFiO0FBQ0EsUUFBQSxNQUFBLEVBQVU7QUFDTkUsY0FBTUMsTUFBQUEsR0FBQUEsR0FBTkQsR0FBQUE7QUFDSDtBQUNELFdBQUEsR0FBQTtBQUNIOztBQUVERSxPQUFBQSxPQUFBQSxHQUFpQjtBQUNiQyxnQkFEYSxVQUFBO0FBRWJDLGtCQUFhQTtBQUZBLENBQWpCRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIEhUTUwg5pSv5oyB55qE5pWw5a2m56ym5Y+3XG5mdW5jdGlvbiBzdHJOdW1EaXNjb2RlKHN0cil7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZmb3JhbGw7L2csICfiiIAnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnBhcnQ7L2csICfiiIInKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJmV4aXN0czsvZywgJ+KIgycpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mZW1wdHk7L2csICfiiIUnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJm5hYmxhOy9nLCAn4oiHJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZpc2luOy9nLCAn4oiIJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZub3RpbjsvZywgJ+KIiScpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mbmk7L2csICfiiIsnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnByb2Q7L2csICfiiI8nKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnN1bTsvZywgJ+KIkScpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mbWludXM7L2csICfiiJInKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJmxvd2FzdDsvZywgJ+KIlycpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mcmFkaWM7L2csICfiiJonKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnByb3A7L2csICfiiJ0nKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJmluZmluOy9nLCAn4oieJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZhbmc7L2csICfiiKAnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJmFuZDsvZywgJ+KIpycpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mb3I7L2csICfiiKgnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJmNhcDsvZywgJ+KIqScpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mY2FwOy9nLCAn4oiqJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZpbnQ7L2csICfiiKsnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnRoZXJlNDsvZywgJ+KItCcpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mc2ltOy9nLCAn4oi8Jyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZjb25nOy9nLCAn4omFJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZhc3ltcDsvZywgJ+KJiCcpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mbmU7L2csICfiiaAnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJmxlOy9nLCAn4omkJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZnZTsvZywgJ+KJpScpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mc3ViOy9nLCAn4oqCJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZzdXA7L2csICfiioMnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJm5zdWI7L2csICfiioQnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnN1YmU7L2csICfiioYnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnN1cGU7L2csICfiiocnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJm9wbHVzOy9nLCAn4oqVJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZvdGltZXM7L2csICfiipcnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnBlcnA7L2csICfiiqUnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnNkb3Q7L2csICfii4UnKTtcbiAgICByZXR1cm4gc3RyO1xufVxuXG4vL0hUTUwg5pSv5oyB55qE5biM6IWK5a2X5q+NXG5mdW5jdGlvbiBzdHJHcmVlY2VEaXNjb2RlKHN0cil7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZBbHBoYTsvZywgJ86RJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZCZXRhOy9nLCAnzpInKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJkdhbW1hOy9nLCAnzpMnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJkRlbHRhOy9nLCAnzpQnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJkVwc2lsb247L2csICfOlScpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mWmV0YTsvZywgJ86WJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZFdGE7L2csICfOlycpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mVGhldGE7L2csICfOmCcpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mSW90YTsvZywgJ86ZJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZLYXBwYTsvZywgJ86aJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZMYW1iZGE7L2csICfOmycpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mTXU7L2csICfOnCcpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mTnU7L2csICfOnScpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mWGk7L2csICfOnScpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mT21pY3JvbjsvZywgJ86fJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZQaTsvZywgJ86gJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZSaG87L2csICfOoScpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mU2lnbWE7L2csICfOoycpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mVGF1Oy9nLCAnzqQnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJlVwc2lsb247L2csICfOpScpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mUGhpOy9nLCAnzqYnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJkNoaTsvZywgJ86nJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZQc2k7L2csICfOqCcpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mT21lZ2E7L2csICfOqScpO1xuXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZhbHBoYTsvZywgJ86xJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZiZXRhOy9nLCAnzrInKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJmdhbW1hOy9nLCAnzrMnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJmRlbHRhOy9nLCAnzrQnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJmVwc2lsb247L2csICfOtScpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8memV0YTsvZywgJ862Jyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZldGE7L2csICfOtycpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mdGhldGE7L2csICfOuCcpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8maW90YTsvZywgJ865Jyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZrYXBwYTsvZywgJ866Jyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZsYW1iZGE7L2csICfOuycpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mbXU7L2csICfOvCcpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mbnU7L2csICfOvScpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8meGk7L2csICfOvicpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mb21pY3JvbjsvZywgJ86/Jyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZwaTsvZywgJ8+AJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZyaG87L2csICfPgScpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mc2lnbWFmOy9nLCAnz4InKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnNpZ21hOy9nLCAnz4MnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnRhdTsvZywgJ8+EJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZ1cHNpbG9uOy9nLCAnz4UnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnBoaTsvZywgJ8+GJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZjaGk7L2csICfPhycpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mcHNpOy9nLCAnz4gnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJm9tZWdhOy9nLCAnz4knKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnRoZXRhc3ltOy9nLCAnz5EnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnVwc2loOy9nLCAnz5InKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnBpdjsvZywgJ8+WJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZtaWRkb3Q7L2csICfCtycpO1xuICAgIHJldHVybiBzdHI7XG59XG5cbi8vIFxuXG5mdW5jdGlvbiBzdHJjaGFyYWN0ZXJEaXNjb2RlKHN0cil7XG4gICAgLy8g5Yqg5YWl5bi455So6Kej5p6QXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZuYnNwOy9nLCAnICcpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mcXVvdDsvZywgXCInXCIpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mYW1wOy9nLCAnJicpO1xuICAgIC8vIHN0ciA9IHN0ci5yZXBsYWNlKC8mbHQ7L2csICfigLknKTtcbiAgICAvLyBzdHIgPSBzdHIucmVwbGFjZSgvJmd0Oy9nLCAn4oC6Jyk7XG5cbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJmx0Oy9nLCAnPCcpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mZ3Q7L2csICc+Jyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyYjODIyNjsvZywgJ+KAoicpO1xuXG4gICAgcmV0dXJuIHN0cjtcbn1cblxuLy8gSFRNTCDmlK/mjIHnmoTlhbbku5blrp7kvZNcbmZ1bmN0aW9uIHN0ck90aGVyRGlzY29kZShzdHIpe1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mT0VsaWc7L2csICfFkicpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mb2VsaWc7L2csICfFkycpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mU2Nhcm9uOy9nLCAnxaAnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnNjYXJvbjsvZywgJ8WhJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZZdW1sOy9nLCAnxbgnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJmZub2Y7L2csICfGkicpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mY2lyYzsvZywgJ8uGJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZ0aWxkZTsvZywgJ8ucJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZlbnNwOy9nLCAnJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZlbXNwOy9nLCAnJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZ0aGluc3A7L2csICcnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnp3bmo7L2csICcnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnp3ajsvZywgJycpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mbHJtOy9nLCAnJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZybG07L2csICcnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJm5kYXNoOy9nLCAn4oCTJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZtZGFzaDsvZywgJ+KAlCcpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mbHNxdW87L2csICfigJgnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnJzcXVvOy9nLCAn4oCZJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZzYnF1bzsvZywgJ+KAmicpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mbGRxdW87L2csICfigJwnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnJkcXVvOy9nLCAn4oCdJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZiZHF1bzsvZywgJ+KAnicpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mZGFnZ2VyOy9nLCAn4oCgJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZEYWdnZXI7L2csICfigKEnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJmJ1bGw7L2csICfigKInKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJmhlbGxpcDsvZywgJ+KApicpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mcGVybWlsOy9nLCAn4oCwJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZwcmltZTsvZywgJ+KAsicpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mUHJpbWU7L2csICfigLMnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJmxzYXF1bzsvZywgJ+KAuScpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mcnNhcXVvOy9nLCAn4oC6Jyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZvbGluZTsvZywgJ+KAvicpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mZXVybzsvZywgJ+KCrCcpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mdHJhZGU7L2csICfihKInKTtcblxuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mbGFycjsvZywgJ+KGkCcpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mdWFycjsvZywgJ+KGkScpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mcmFycjsvZywgJ+KGkicpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mZGFycjsvZywgJ+KGkycpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8maGFycjsvZywgJ+KGlCcpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mY3JhcnI7L2csICfihrUnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJmxjZWlsOy9nLCAn4oyIJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZyY2VpbDsvZywgJ+KMiScpO1xuXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZsZmxvb3I7L2csICfijIonKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJnJmbG9vcjsvZywgJ+KMiycpO1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mbG96Oy9nLCAn4peKJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZzcGFkZXM7L2csICfimaAnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJmNsdWJzOy9nLCAn4pmjJyk7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyZoZWFydHM7L2csICfimaUnKTtcblxuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mZGlhbXM7L2csICfimaYnKTtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJiMzOTsvZywgJ1xcJycpO1xuICAgIHJldHVybiBzdHI7XG59XG5cbmZ1bmN0aW9uIHN0ck1vcmVEaXNjb2RlKHN0cil7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL1xcclxcbi9nLFwiXCIpOyAgXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL1xcbi9nLFwiXCIpO1xuXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL2NvZGUvZyxcInd4eHhjb2RlLXN0eWxlXCIpO1xuICAgIHJldHVybiBzdHI7XG59XG5cbmZ1bmN0aW9uIHN0ckRpc2NvZGUoc3RyKXtcbiAgICBzdHIgPSBzdHJOdW1EaXNjb2RlKHN0cik7XG4gICAgc3RyID0gc3RyR3JlZWNlRGlzY29kZShzdHIpO1xuICAgIHN0ciA9IHN0cmNoYXJhY3RlckRpc2NvZGUoc3RyKTtcbiAgICBzdHIgPSBzdHJPdGhlckRpc2NvZGUoc3RyKTtcbiAgICBzdHIgPSBzdHJNb3JlRGlzY29kZShzdHIpO1xuICAgIHJldHVybiBzdHI7XG59XG5mdW5jdGlvbiB1cmxUb0h0dHBVcmwodXJsLHJlcCl7XG4gICAgXG4gICAgdmFyIHBhdHQxID0gbmV3IFJlZ0V4cChcIl4vL1wiKTtcbiAgICB2YXIgcmVzdWx0ID0gcGF0dDEudGVzdCh1cmwpO1xuICAgIGlmKHJlc3VsdCl7XG4gICAgICAgIHVybCA9IHJlcCtcIjpcIit1cmw7XG4gICAgfVxuICAgIHJldHVybiAgdXJsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzdHJEaXNjb2RlOnN0ckRpc2NvZGUsXG4gICAgdXJsVG9IdHRwVXJsOnVybFRvSHR0cFVybFxufSJdLCJmaWxlIjoid3hEaXNjb2RlLmpzIn0=