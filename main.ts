import { Plugin, MarkdownView } from "obsidian";

export default class MetaChatPlugin extends Plugin {
	async onload() {

		/**
		 * 注册一个markdown代码块处理器, 用于处理html代码可直接预览效果
		 * 第一个参数是代码块的名称
		 * 第二个参数是一个回调函数，它接受三个参数：
		 * 1. source: 代码块的内容
		 * 2. el: 代码块的元素
		 * 3. ctx: 代码块的上下文
		 */
		this.registerMarkdownCodeBlockProcessor("html", (source, el, ctx) => {
			const iframe = el.createEl("iframe");
			iframe.setAttribute("srcdoc", source);
			const iframeDoc = iframe.doc || iframe?.contentWindow?.document;
			iframe.style.height = iframeDoc?.body?.scrollHeight + 'px';
			iframe.style.width = "100%";
			iframe.style.border = "none";
		});

		this.registerEvent(this.app.workspace.on('file-open', () => {
			const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
			if (activeView) {
				const file = activeView.file;
				if (file) {
					const metadata = this.app.metadataCache.getFileCache(file);
					if (metadata) {
						console.log('Metadata:', metadata);
					}
				}
			}
		}))
	}
}
