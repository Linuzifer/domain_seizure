
 

function obscureAddMid() {
	document.write('&#64;');
}
function obscureAddEnd() {
	document.write('&#46;');
}


			/* decrypt helper function */
		function decryptCharcode(n,start,end,offset) {
			n = n + offset;
			if (offset > 0 && n > end) {
				n = start + (n - end - 1);
			} else if (offset < 0 && n < start) {
				n = end - (start - n - 1);
			}
			return String.fromCharCode(n);
		}
			/* decrypt string */
		function decryptString(enc,offset) {
			var dec = "";
			var len = enc.length;
			for(var i=0; i < len; i++) {
				var n = enc.charCodeAt(i);
				if (n >= 0x2B && n <= 0x3A) {
					dec += decryptCharcode(n,0x2B,0x3A,offset);	/* 0-9 . , - + / : */
				} else if (n >= 0x40 && n <= 0x5A) {
					dec += decryptCharcode(n,0x40,0x5A,offset);	/* A-Z @ */
				} else if (n >= 0x61 && n <= 0x7A) {
					dec += decryptCharcode(n,0x61,0x7A,offset);	/* a-z */
				} else {
					dec += enc.charAt(i);
				}
			}
			return dec;
		}
			/* decrypt spam-protected emails */
		function linkTo_UnCryptMailto(s) {
			location.href = decryptString(s,2);
		}
		