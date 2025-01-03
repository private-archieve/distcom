"use client";

import { API_URL } from '@/base/Api/Api';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConnectWalletButton from '@/components/wallet/ConnectWalletButton';
import useDataStore from '@/store/dataStore';
import axios from 'axios';
import { Send } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Post, { PostProps } from './components/Posts';

function MainContent() {
  // Access state and actions from Zustand store
  const {
    data,
    isLoggedIn,
    isLoading,
    userAuthID,
    userAuthToken,
    setLoginStatus,
    setUserAuthID,
    setUserAuthToken,
    setSiteData,
    chatData,
    setChatData,
    notes,
    setNotes,
    setCsrfToken,
    csrfToken,
    siteData,
  } = useDataStore();

  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [activeTab, setActiveTab] = useState('global');
  const [isModalAuthOpen, setIsModalAuthOpen] = useState(false);

  const handleWalletLogin = async () => {
    // const providerResponse = await checkMinaProvider();

    // if (providerResponse === true) {
    //   try {
    //     const walletAddress = await requestAccounts();

    //     if (!walletAddress) {
    //       setLoginStatus(false);
    //       throw new Error('Failed to retrieve wallet address. Please check your wallet extension.');
    //     } else {
    //       setLoginStatus(true);
    //       setUserAuthID(walletAddress[0]);
    //       console.log("Wallet connected: ", walletAddress);

    //       // Close the modal after successful login
    //       setIsModalAuthOpen(false);

    //       // Optionally, retrieve and set the userAuthToken here
    //       // const token = await fetchUserToken(walletAddress);
    //       // setUserAuthToken(token);
    //     }
    //   } catch (error) {
    //     console.error("Error: ", error);
    //   }
    // } else {
    //   console.error("No provider found");
    // }
  };

  const handlePostButtonClick = async () => {
    // if (isLoggedIn) {
    setIsModalAuthOpen(true);
    //   return;
    // }

    // if (postContent.trim() !== '') {
    //   try {
    //     const response = await createPost(
    //       { UserID: userAuthID, UserToken: userAuthToken, Content: postContent },
    //       userAuthToken
    //     );
    //     if (response && response.status === "Ok") {
    //       // Optionally add the new post to the posts array
    //       // setPosts(prevPosts => [newPost, ...prevPosts]);
    //       // For immediate UI feedback, you might want to fetch the posts again or append the new post
    //       fetchPosts(); // Ensure fetchPosts is accessible here
    //     } else {
    //       console.error('Post creation failed, please try again later.');
    //     }
    //   } catch (error) {
    //     console.error('Error while posting:', error);
    //   }

    //   setPostContent('');
    // }
  };

  // Fetch posts when not loading
  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/GetMogartPosts`);
      const mappedPosts: PostProps[] = data.map((post: any) => ({
        GlobalId: post.Pstid,
        Author: post.PstAuthor,
        Avatar: post.PstAuthorAvatar,
        Content: post.PstContent,
        VideoUrl: post.PstVideos,
        ImageUrl: post.PstImages,
        CommentCount: post.PstCommentCount,
        Date: post.PstDate,
        DisLike: post.PstDisLike,
        Mentions: post.PstMentions,
        Name: post.PstName,
        Points: post.PstPoints,
        PostCode: post.PstPostCode,
        Space: post.PstSpace,
        Title: post.PstTitle,
        VideoTitle: post.PstTitle,
        VideoDesc: post.PstContent,
        Views: post.PstViews,
        Likes: typeof post.PstLike === 'string' ? JSON.parse(post.PstLike) : post.PstLike,
        Comments: typeof post.PstComments === 'string' ? JSON.parse(post.PstComments) : post.PstComments,
      }));
      setPosts(mappedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    if (isLoading) return;

    fetchPosts();
  }, [isLoading]);

  if (isLoading) {
    // Optionally render a loading state while authentication is being verified
    return (
      <main className="w-full max-w-3xl mx-auto px-4 py-6">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="w-full max-w-3xl mx-auto px-4 py-6 space-y-6">
      <Image src={"/logo-1200.png"} alt="Site Logo" width={300} height={300} className=" h-auto" />
      {/* {isLoggedIn && (
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <Image
              className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/10"
              src={data?.ProfileImage || "https://placehold.co/400"}
              alt="User Avatar"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
            />
            <div className="flex-1 flex gap-2">
              <Input
                className="flex-1"
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
              <Button
                onClick={handlePostButtonClick}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )} */}

      <Card className="p-4">
        <div className="flex items-center justify-between mb-0">
          <Tabs defaultValue="global" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="global">Members</TabsTrigger>
              {/* <TabsTrigger value="local">Local</TabsTrigger> */}
              <TabsTrigger value="latest">Latest</TabsTrigger>
              <TabsTrigger value="follows">Follows</TabsTrigger>
              <TabsTrigger value="mentions">Mentions</TabsTrigger>
            </TabsList>
          </Tabs>
          <ConnectWalletButton />
        </div>
      </Card>

      <Card className="sticky top-2 z-1 p-4">
        <div className="flex items-center justify-between mb-0">
          <Input
            placeholder="What's on your mind?"
            className="flex-1"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            maxLength={3301}
          />
          <Button
            variant="outline"
            className="ml-4 hidden md:flex items-center gap-2"
            onClick={handlePostButtonClick}
          >
            <Send className="h-4 w-4" />
            Post
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post key={post.GlobalId} {...post} />
          ))
        ) : (
          <Post
            GlobalId="123"
            Author="John Doe"
            Avatar="https://via.placeholder.com/150"
            Content="This is a post."
            Date="2023-08-25T12:34:56Z"
            CommentCount={5}
            Likes={[{ userName: 'Jane' }, { userName: 'Doe' }]}
            Comments={[
              {
                author: 'Jane',
                content: 'Great post!',
                comment_id: 1,
                profile_image: '/path/to/profile.jpg',
                comment_date: '2023-08-25T13:00:00Z',
                likes: '2',
                replies: '0',
              }
            ]}
          />
        )}
      </div>


      {/* <ModalAuth
        isOpen={isModalAuthOpen}
        onClose={() => setIsModalAuthOpen(false)}
        onConnect={handleWalletLogin}
      /> */}
    </main>
  );
}

export default MainContent;
