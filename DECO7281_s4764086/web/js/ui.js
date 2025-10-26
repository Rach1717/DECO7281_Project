export function addBubble(wrap, who, text) {
  const li = document.createElement("li");
  li.className = who;
  li.textContent = text;
  wrap.appendChild(li);
  wrap.scrollTop = wrap.scrollHeight;
}
