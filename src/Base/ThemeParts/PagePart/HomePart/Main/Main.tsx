'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Fingerprint, Send, Signature, Users, Wallet } from 'lucide-react'
import { createPost, API_URL, Postlogin } from '@/base/Api/Api'
import axios from 'axios'
import Post, { PostProps } from './components/Posts'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import Image from 'next/image'

import { SiteData, useData } from '@/base/Context/DataContext';
import { checkMinaProvider, requestAccounts } from '@/base/WalletProc/Wallet';


function MainContent() {
  //const { isLoggedIn, data, isLoading, siteData, userAuthID, userAuthToken } = useData()
  const [postContent, setPostContent] = useState('')
  const [posts, setPosts] = useState<PostProps[]>([])
  const [activeTab, setActiveTab] = useState('global')

  const { isLoading, setIsLoading } = useData();

  const { userAuthID, setUserAuthID } = useData();
  const { userAuthToken, setUserAuthToken } = useData();
  const { isLoggedIn, setLoginStatus } = useData();
  const { siteData, setSiteData, data, updateData } = useData();
  const formRef = useRef<HTMLFormElement>(null);
  const [LoginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleWalletLogin = async () => {
    const providerResponse = await checkMinaProvider();

    if (providerResponse === true) {
      try {
        const walletAddress = await requestAccounts();

        if (!walletAddress) {
          throw new Error('Failed to retrieve wallet address. Please check your wallet extension.');
        } else {
          console.log("Wallet connected: ", walletAddress);
        }

        const response = await Postlogin({ walletAddress });
        const { message, status, token, userId, userdata } = response;

        console.log("Response: ", response);

        if (status === "Ok") {
          setUserAuthToken(token);
          setLoginSuccess(true);
          setLoginStatus(true);
          setUserAuthID(userId);
          updateData(userdata);
        } else if (status === "alreadylogged") {
          console.log("User already logged in");
        } else if (status === "Bad Request") {
          setErrorMessage(message);
          setTimeout(() => setErrorMessage(""), 2500)
        } else if (status === "Not Found") {
          setErrorMessage(message);
          setTimeout(() => setErrorMessage(""), 2500)
        } else {
          setErrorMessage(message || "An error occurred during login.");
          setTimeout(() => setErrorMessage(""), 2500)
        }

      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error);
          setErrorMessage(error.message);
          setTimeout(() => setErrorMessage(""), 2500)
        } else {
          console.error("An unknown error occurred");
          setErrorMessage("An unknown error occurred");
          setTimeout(() => setErrorMessage(""), 2500)
        }
      }
    } else {
      setErrorMessage("Provider not found, please log in with a provider.");
      setTimeout(() => setErrorMessage(""), 2500)
    }
  };



  const handlePostButtonClick = async () => {
    if (postContent.trim() !== '') {
      try {
        const response = await createPost({ UserID: userAuthID, UserToken: userAuthToken, Content: postContent }, userAuthToken)
        if (response && response.status === "Ok") {
          // Optionally add the new post to the posts array
          // setPosts(prevPosts => [newPost, ...prevPosts])
        } else {
          console.error('Post creation failed, please try again later.')
        }
      } catch (error) {
        console.error('Error while posting:', error)
      }

      setPostContent('')
    }
  }

  useEffect(() => {
    if (isLoading) return

    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/GetMogartPosts`)
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
        }))
        setPosts(mappedPosts)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchPosts()
  }, [isLoading])

  return (
    <main className="w-full max-w-3xl mx-auto px-4 py-6 space-y-6">
      {isLoggedIn && (
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <Image
              className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/10"
              src={data?.ProfileImage || siteData?.SiteDefaultProfileImageURL}
              alt="User Avatar"
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
      )}

      <Card className="p-4">
        <div className="flex items-center justify-between mb-0">
          {/* <Image src={"/logo-1200.png"} alt="Logo" width={100} height={100} /> */}
          <Tabs defaultValue="global" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="global">Members</TabsTrigger>
              {/* <TabsTrigger value="local">Local</TabsTrigger> */}
              <TabsTrigger value="latest">Latest</TabsTrigger>
              <TabsTrigger value="follows">Follows</TabsTrigger>
              <TabsTrigger value="mentions">Mentions</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" className="ml-4 hidden md:flex items-center gap-2" onClick={() => {
            handleWalletLogin()
          }}>
            <Fingerprint className="h-4 w-4" />
            Connect
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post key={post.GlobalId} {...post} />
          ))
        ) : (
          <>
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
          </>
        )}
      </div>
    </main>
  )
}

export default MainContent

