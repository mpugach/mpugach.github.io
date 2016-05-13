export default function notify(str) {
  const node = document.createElement('div');
  const delay = Math.random() * 1000;

  node.appendChild(document.createTextNode(str));

  setTimeout(() => document.getElementById('notifier').appendChild(node), delay);
  setTimeout(() => node.remove(), delay + 8000);
}
