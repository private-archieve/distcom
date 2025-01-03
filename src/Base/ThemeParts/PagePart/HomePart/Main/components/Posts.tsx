'use client';


import { PostSendComment, PostSendDislike, PostSendLike } from '@/base/Api/Api';
import { PostComments } from '@/base/Details/PostDetail/PostDetail';
import SharePopup from '@/base/ThemeParts/Popup/SharePopup';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import useDataStore from '@/store/dataStore';
import { Heart, MessageCircle, MoreVertical, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';


export interface PostProps {
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


export interface Like {
    userName: string;
}

const Post: React.FC<PostProps> = ({
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
    const { siteData, data, isLoading, userAuthToken, isLoggedIn } = useDataStore();
    const router = useRouter();
    const [play, setPlay] = useState<boolean>(false);


    useEffect(() => {
        //if (isLoading) return;

        try {
            const userLiked = Likes.some((like: Like) => like.userName === data.UserName);
            setIsLiked(userLiked);
        } catch (error) {
            console.error("Failed to update isLiked state:", error);
            setIsLiked(false);
        }
    }, [Likes, data, isLoading]);

    const handleLike = async () => {
        try {
            if (isLiked) {
                await PostSendDislike(
                    { UserID: data.UserName, ContentID: GlobalId, ContentType: "PostContent" },
                    userAuthToken || ""
                );
                setLikeCount(likeCount - 1);
            } else {
                await PostSendLike(
                    { UserID: data.UserName, ContentID: GlobalId, ContentType: "PostContent" },
                    userAuthToken || ""
                );
                setLikeCount(likeCount + 1);
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.error("Error updating like status:", error);
        }
    };

    const handleSendComment = async () => {
        if (!isLoggedIn) {
            toast({
                title: "Login to send a comment",
                description: "Authenticate with your Mina Wallet in order to send a comment.",
                variant: "destructive",
            });
            return;
        }

        if (!commentText.trim()) return;
        try {
            await PostSendComment(
                { UserID: data, ContentID: GlobalId, Content: commentText, ContentType: "PostContent" },
                userAuthToken || ""
            );
            setCommentsList([...commentsList, { author: data, content: commentText, comment_id: 1, profile_image: "1", comment_date: "1", likes: "1", replies: "1" }]);
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
        <div className="rounded-xl border bg-card text-card-foreground shadow p-4">
            {/* Author and Actions */}
            <div className="flex items-center justify-between mb-3">
                <Link href={`/posts/${GlobalId}`}>
                    <div className="flex items-center gap-3 no-underline text-gray-700">
                        {/* <Avatar>
                            <AvatarImage src={Avatar} alt={Author} />
                            <AvatarFallback>{Author[0]}</AvatarFallback>
                        </Avatar> */}
                        <div>
                            <h3 className="font-semibold">{Author}</h3>
                            <p className="text-sm text-muted-foreground">
                                {/* {formatDistance(new Date(Date), new Date(), { addSuffix: true })} */}
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
                        <DropdownMenuItem onClick={() => console.log("Post saved")}>Save</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log("Post reported")}>Report</DropdownMenuItem>
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
                                {/* <Avatar>
                                    <AvatarImage src={comment.avatar || siteData?.SiteDefaultProfileImageURL} alt={comment.userName} />
                                    <AvatarFallback>{comment.userName[0]}</AvatarFallback>
                                </Avatar> */}
                                <div className="ml-2">
                                    <span className="font-medium">{comment.author}</span>
                                    <p className="text-sm">{comment.content}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                {/* Comment Input */}
                <div className="mt-4 flex items-center space-x-2">
                    <Input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Type a comment..."
                        className="flex-grow px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                        autoFocus
                    />

                    <Button
                        className="inline-flex justify-center items-center px-4 py-2  text-white rounded-md transition duration-150 ease-in-out flex-shrink-0"
                        onClick={handleSendComment}
                    >
                        Send
                    </Button>
                </div>


            </div>
        </div>
    );
};

export default Post;
