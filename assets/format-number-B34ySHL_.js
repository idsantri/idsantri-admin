const s=t=>{let n;return isNaN(t)?n=0:n=Number(t),n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")};function o(t){const n=/\d/g,e=t.match(n);return e?e.join(""):""}export{s as d,o as n};
