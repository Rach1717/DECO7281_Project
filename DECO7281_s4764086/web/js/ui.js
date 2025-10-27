export function addBubble(wrap, who, text) {
  if (!wrap) {
    console.error("addBubble: wrap not found");
  }
  const li = document.createElement("li");
  li.className = `bubble ${who}`;
  const content = document.createElement("span");
  content.className = "content";
  content.textContent = String(text ?? "");
  li.appendChild(content);

  wrap.appendChild(li);
  wrap.scrollTop = wrap.scrollHeight;
  return li;
}
