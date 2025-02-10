import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import React, { useEffect } from "react";
import PropTypes from "prop-types";

export default function TipTapEditor({ content, onChange, onImageUpload }) {
    const editor = useEditor({
        extensions: [StarterKit, Image],
        content,
        onUpdate: ({ editor }) => {
            if (onChange) {
                onChange(editor.getHTML());
            };
        },
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        };
    }, [content, editor]);

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (onImageUpload) {
            onImageUpload(file);
        }
        const imageUrl = URL.createObjectURL(file);
        editor?.chain().focus().setImage({ src: imageUrl }).run();
    };

    if (!editor) return <p>에디터 로딩 중...</p>;

    return (
        <div className="border p-4  rounded-md">
            <div className="mb-2 flex gap-2">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className="border p-1">굵게</button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className="border p-1">I</button>
            </div>
            <div className="mb-2 flex gap-2">
                <input type="file" onChange={handleImageUpload} className="border p-1" />
            </div>
            <EditorContent editor={editor} className="border p-2" />
        </div>
    );
};

TipTapEditor.propTypes = {
    content: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onImageUpload: PropTypes.func.isRequired,
};

