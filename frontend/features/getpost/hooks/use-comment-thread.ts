import { useEffect, useMemo, useRef, useState } from "react";

import { comments } from "../types/comments";

export function useCommentThread(comment: comments) {
  const [collapsed, setCollapsed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const lastReplyHeaderRef = useRef<HTMLDivElement>(null);
  const [isReplying, setIsReplying] = useState(false);
  const [showAllReplies, setShowAllReplies] = useState(false);

  const replies = comment.replies ?? [];
  const hasReplies = replies.length > 0;

  const visibleReplies = useMemo(
    () => (showAllReplies ? replies : replies.slice(0, 3)),
    [replies, showAllReplies],
  );

  const remainingReplies = useMemo(
    () => Math.max(0, replies.length - 3),
    [replies.length],
  );

  useEffect(() => {
    if (!hasReplies || collapsed || !rootRef.current || !lastReplyHeaderRef.current) {
      return;
    }

    const measure = () => {
      const rootEl = rootRef.current;
      const lastReplyEl = lastReplyHeaderRef.current;

      if (!rootEl || !lastReplyEl) return;

      const rootRect = rootEl.getBoundingClientRect();
      const replyRect = lastReplyEl.getBoundingClientRect();
      const centerOfAvatar = replyRect.top - rootRect.top + 20 / 2;
      const totalHeight = rootEl.clientHeight;
      const gapFromBottom = totalHeight - centerOfAvatar;

      rootEl.style.setProperty("--tronco-bottom", `${Math.max(0, gapFromBottom)}px`);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(rootRef.current);

    return () => ro.disconnect();
  }, [collapsed, hasReplies, isReplying, replies.length, showAllReplies]);

  return {
    collapsed,
    setCollapsed,
    rootRef,
    lastReplyHeaderRef,
    isReplying,
    setIsReplying,
    visibleReplies,
    remainingReplies,
    showAllReplies,
    setShowAllReplies,
    hasReplies,
    replies,
  };
}
