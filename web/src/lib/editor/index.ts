import { basicSetup } from "codemirror";
import { EditorView } from "@codemirror/view";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { EditorState } from "@codemirror/state";
import { editorTheme } from "./theme";
import { createModeToggleKeymap } from "./keymap";
import { createUploadExtension } from "./upload";
import { livePreviewPlugin } from "./decorations";

export interface EditorExtensionsOptions {
  onModeToggle: () => void;
  onFileUpload: (file: File, view: EditorView) => void;
  onDocChange: (doc: string) => void;
}

export function createEditorExtensions(options: EditorExtensionsOptions) {
  return [
    basicSetup,
    EditorView.lineWrapping,
    markdown({ base: markdownLanguage }),
    editorTheme,
    createModeToggleKeymap(options.onModeToggle),
    createUploadExtension(options.onFileUpload),
    EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        options.onDocChange(update.state.doc.toString());
      }
    }),
    livePreviewPlugin,
  ];
}

export { EditorState, EditorView };
