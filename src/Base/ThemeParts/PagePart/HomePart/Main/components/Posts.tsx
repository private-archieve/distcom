// SocialPost.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDistance } from 'date-fns';
import { Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SharePopup from '../../../../Popup/SharePopup'; // Adjust path as needed
import ReactPlayer from 'react-player';
import { PostSendComment, PostSendDislike, PostSendLike } from '../../../../../Api/Api'; // Adjust path
import { useData } from '../../../../../Context/DataContext'; // Adjust path
import { useRouter } from 'next/navigation';

export interface SocialPostProps {
  GlobalId: string;
  Author: string;
  Avatar: string;
  Content: string;
  Date: string;
  VideoUrl?: string[]; // Array to support multiple video URLs if needed
  VideoTitle?: string;
  VideoDesc?: string;
  CommentCount: number; // Changed to number for easier manipulation
  Likes: Like[]; // Define a `Like` interface based on your data structure
  Comments: PostComments[];
}

// Define the Like interface based on your data structure
export interface Like {
  userName: string;
  // Add other fields if necessary (e.g., timestamp)
}

const SocialPost: React.FC<SocialPostProps> = ({
  GlobalId,
  Author,
  Avatar,
  Content,
  Date,
  VideoUrl,
  VideoTitle,
  VideoDesc,
  CommentCount,
  Likes,
  Comments,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(Likes.length);
  const [commentsList, setCommentsList] = useState<PostComments[]>(Comments);
  const [showSharePopup, setShowSharePopup] = useState<boolean>(false);
  const [showActionsPopup, setShowActionsPopup] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');
  const { siteData, data, isLoading, userAuthToken } = useData();
  const router = useRouter();
  const [play, setPlay] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) return;

    try {
      const userLiked = Likes.some((like: Like) => like.userName === data.UserName);
      setIsLiked(userLiked);
    } catch (error) {
      console.error("Failed to update isLiked state:", error);
      setIsLiked(false);
    }
  }, [Likes, data.UserName, isLoading]);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await PostSendDislike(
          { UserID: data.UserName, ContentID: GlobalId, ContentType: "PostContent" },
          userAuthToken
        );
        setLikeCount(likeCount - 1);
      } else {
        await PostSendLike(
          { UserID: data.UserName, ContentID: GlobalId, ContentType: "PostContent" },
          userAuthToken
        );
        setLikeCount(likeCount + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const handleSendComment = async () => {
    if (!commentText.trim()) return;
    try {
      await PostSendComment(
        { UserID: data.UserName, ContentID: GlobalId, Content: commentText, ContentType: "PostContent" },
        userAuthToken
      );
      setCommentsList([...commentsList, { userName: data.UserName, comment: commentText }]);
      setCommentText('');
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };

  const handleActionClick = () => {
    setShowActionsPopup(!showActionsPopup);
  };

  const handleShareClick = () => {
    setShowSharePopup(true);
  };

  const handleCloseSharePopup = () => {
    setShowSharePopup(false);
  };

  const handleCommentNavigation = () => {
    router.push(`/Posts/${GlobalId}`);
  };

  const startVideo = () => {
    setPlay(true);
  };

  return (
    <div className="w-full max-w-2xl rounded-lg border bg-card text-card-foreground shadow-sm mb-8 p-4 hover:shadow-xl transition-shadow duration-300">
      {/* Author and Actions */}
      <div className="flex items-center justify-between mb-3">
        <Link href={`/posts/${GlobalId}`}>
          <div className="flex items-center gap-3 no-underline text-gray-700">
            <Avatar>
              <AvatarImage src={Avatar} alt={Author} />
              <AvatarFallback>{Author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{Author}</h3>
              <p className="text-sm text-muted-foreground">
                {formatDistance(new Date(Date), new Date(), { addSuffix: true })}
              </p>
            </div>
          </div>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log("Post saved")}>Kaydet</DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Post reported")}>Şikayet Et</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{Content}</h2>
        {/* If you have translations or additional content, you can include them here */}
      </div>

      {/* Media */}
      {VideoUrl && VideoUrl.length > 0 && (
        <div className="relative aspect-video w-full bg-muted mb-3">
          <ReactPlayer
            url={VideoUrl[0]} // Assuming the first URL is the primary video
            playing={play}
            controls={true}
            onStart={startVideo}
            width="100%"
            height="100%"
            className="react-player rounded-lg"
          />
          {VideoTitle && <h3 className="mt-2 text-lg font-semibold">{VideoTitle}</h3>}
          {VideoDesc && <p className="text-sm text-muted-foreground">{VideoDesc}</p>}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-2 ${isLiked ? 'text-blue-600' : 'text-gray-600 hover:text-blue-700'}`}
            onClick={handleLike}
          >
            <Heart className="h-4 w-4" />
            <span>{likeCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-gray-600 hover:text-green-700"
            onClick={handleCommentNavigation}
          >
            <MessageCircle className="h-4 w-4" />
            <span>{CommentCount} Comment{CommentCount !== 1 ? 's' : ''}</span>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-gray-600 hover:text-red-700"
          onClick={handleShareClick}
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </div>

      {/* Share Popup */}
      {showSharePopup && (
        <SharePopup
          url={`http://localhost:3000/posts/${GlobalId}`}
          title={Author}
          onClose={handleCloseSharePopup}
        />
      )}

      {/* Comments Section */}
      <div className="mt-4">
        <h4 className="text-md font-semibold">Comments</h4>
        <ul className="mt-2">
          {commentsList.map((comment, index) => (
            <li key={index} className="mb-2">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src={comment.avatar || siteData?.SiteDefaultProfileImageURL} alt={comment.userName} />
                  <AvatarFallback>{comment.userName[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-2">
                  <span className="font-medium">{comment.userName}</span>
                  <p className="text-sm">{comment.comment}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {/* Comment Input */}
        <div className="mt-4 flex items-center space-x-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Type a comment..."
            className="flex-grow px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            autoFocus
          />
          <button
            className="inline-flex justify-center items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-150 ease-in-out flex-shrink-0"
            onClick={handleSendComment}
          >
            Send
          </button>
        </div>
      </div>
    </div>
    };

export default React.memo(SocialPost);
