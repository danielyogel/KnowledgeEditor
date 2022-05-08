import { RichText } from '../components/Editors';

export const EMBED_CODE = {
  Icon: () => <div>Embed Code</div>,
  initialValue: '',
  convertString: (html: string) => {
    var div = document.createElement('div');
    div.innerHTML = html;
    const text = div.innerText;
    return `<div>${text}</div>`;
  },
  View: RichText([])
};
