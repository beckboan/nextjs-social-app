"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import PlaceHolder from "@tiptap/extension-placeholder";
import { submitPost } from "./actions";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "@/app/(main)/SessionProvider";
import { Button } from "@/components/ui/button";
import "./styles.css";
import useSubmitPostMutation from "./mutations";
import LoadingButton from "@/components/LoadingButton";

interface PostEditorProps {}

const PostEditor: React.FC<PostEditorProps> = ({}) => {
  // Call useSession hook to get user
  const { user } = useSession();

  const mutation = useSubmitPostMutation();
  // Setup tiptap editor
  const editor = useEditor({
    //Disable immediatelyRender to prevent hydration issues
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      PlaceHolder.configure({
        placeholder: "Share your thoughts here.",
      }),
    ],
  });

  // Get text from input
  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  // Call submitPost on submit
  async function onSubmit() {
    mutation.mutate(input, {
      onSuccess: () => {
        editor?.commands.clearContent();
      },
    });
    editor?.commands.clearContent();
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className="max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3"
        />
      </div>
      <div className="flex justify-end">
        <LoadingButton
          onClick={onSubmit}
          loading={mutation.isPending}
          // Disable button if there is no content
          disabled={!input.trim()}
          className="min-w-20"
        >
          Post
        </LoadingButton>
      </div>
    </div>
  );
};

export default PostEditor;
