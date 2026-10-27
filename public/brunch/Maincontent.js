// ---------- DATA ----------
const items = [
  {id:1, img:"c:/Users/premk/Downloads/Veg Sandwich.jpeg", n:'Veg Sandwich',      p:120},
  {id:2, img:"c:/Users/premk/Downloads/Grilled Cheese Sandwich.jpeg", n:'Grilled Cheese Sandwich',   p:220},
  {id:3, img:"c:/Users/premk/Downloads/Omelette.jpeg", n:'Omelette',    p:240},
  {id:4, img:"c:/Users/premk/Downloads/Crispy potato.jpeg", n:'Crispy potato',     p:120},
  {id:5, img:"c:/Users/premk/Downloads/French toast.jpeg", n:'French toast', p:150},
  {id:6, img:"c:/Users/premk/Downloads/Pancake.jpeg", n:'Pancake',     p:180},
  {id:7, img:"c:/Users/premk/Downloads/Tiramisu.jpeg", n:'Tiramisu',     p:140},
  {id:8, img:"c:/Users/premk/Downloads/Browine.jpeg", n:'Browine',     p:80},
  {id:9, img:"c:/Users/premk/Downloads/Hot Coffee.jpeg", n:'Hot Coffee',     p:85},
  {id:10, img:"c:/Users/premk/Downloads/Caramel Frappuccino.jpeg", n:'Caramel Frappuccino',     p:160}
];
let wish = new Set();   // wishlist ids
let cart = {};          // { id: quantity }

// ---------- NAVIGATION ----------
// Switch between pages: 'main', 'wish', 'cart'
function show(page){
  ['main','wish','cart'].forEach(x =>
    document.getElementById(x).classList.toggle('hide', x !== page));
  window.scrollTo(0,0);
  render();
}

// Go to a section: 'home', 'menu', 'blog', 'contact'
function go(id){
  if(document.getElementById('main').classList.contains('hide')) show('main');
  setTimeout(() => {
    if(id === 'home') window.scrollTo({top:0, behavior:'smooth'});
    else document.getElementById(id).scrollIntoView({behavior:'smooth'});
  }, 30);
}

// ---------- ACTIONS ----------
function toast(text){
  const t = document.getElementById('toast');
  t.textContent = text;
  t.classList.add('on');
  setTimeout(() => t.classList.remove('on'), 1400);
}
function toggleWish(id){
  wish.has(id) ? wish.delete(id) : wish.add(id);
  toast(wish.has(id) ? 'Added to wishlist ♡' : 'Removed');
  render();
}
function add(id){
  cart[id] = (cart[id] || 0) + 1;
  toast('Added to cart 🛒');
  render();
}
function qty(id, change){
  cart[id] += change;
  if(cart[id] <= 0) delete cart[id];
  render();
}
function reg(e){
  e.preventDefault();
  toast('Thanks ' + document.getElementById('n').value + '! 🎉');
  e.target.reset();
  return false;
}

// ---------- DRAW EVERYTHING ----------
function render(){
  // badges
  document.getElementById('wc').textContent = wish.size;
  document.getElementById('cc').textContent = Object.values(cart).reduce((a,b) => a+b, 0);

  // menu cards
  document.getElementById('menuGrid').innerHTML = items.map(i => `
    <div class="card">
      <img src="${i.img}" alt=${i.n}><h4>${i.n}</h4><!--the name under the image--></b><p>₹${i.p}</p>
      <div class="row">
        <button class="btn alt" onclick="toggleWish(${i.id})">${wish.has(i.id) ? '♥️' : '♡'}</button>
        <button class="btn" onclick="add(${i.id})">Add to cart</button>
      </div>
    </div>`).join('');

  // wishlist page
  const w = items.filter(i => wish.has(i.id));
  document.getElementById('wl').innerHTML = w.length ? w.map(i => `
    <div class="line">
      <img src="${i.img}" alt="${i.n}"><span class="g"><b>${i.n}</b><br>₹${i.p}</span>
      <button class="btn" onclick="add(${i.id})">Add to cart</button>
      <button class="btn alt" onclick="toggleWish(${i.id})">✕</button>
    </div>`).join('') : '<p class="center">Your wishlist is empty.</p>';

  // cart page
  const c = items.filter(i => cart[i.id]);
  document.getElementById('cl').innerHTML = c.length ? c.map(i => `
    <div class="line">
      <img src="${i.img}" alt="${i.n}"><span class="g"><b>${i.n}</b><br>₹${i.p * cart[i.id]}</span>
      <button class="btn alt" onclick="qty(${i.id},-1)">−</button>
      <b>${cart[i.id]}</b>
      <button class="btn alt" onclick="qty(${i.id},1)">+</button>
    </div>`).join('') : '<p class="center">Your cart is empty.</p>';
  document.getElementById('tot').textContent =
    c.length ? 'Total: ₹' + c.reduce((s,i) => s + i.p * cart[i.id], 0) : '';
}

render();