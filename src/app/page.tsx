"use client"
import HomePage from '@/pages/Home/HomePage';
import ModalAuth from '@/pages/ModalAuth/ModalAuth';
import { ModalProfile } from '@/pages/ModalProfile/ModalProfile';
import { useQueryState } from 'nuqs';
import { Suspense } from 'react';

type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined;
};

export default function Home({ searchParams }: SearchParamProps) {
    const [modal, setModal] = useQueryState('modal')
    console.log("modal value: ", modal);
    return (
        <Suspense fallback={<div>Loading..</div>}>
            <HomePage />
            {modal === "auth" && <ModalAuth />}
            {modal === "profile" && <ModalProfile />}
        </Suspense>
    );
}



















// "use client"
// import dynamic from 'next/dynamic';
// import React, { Suspense } from 'react';

// const HomePage = dynamic(() => import('../../src/Pages/Home/HomePage.tsx'), { ssr: false });
// const AboutPage = dynamic(() => import('../../src/Pages/About/About.tsx'), { ssr: false });
// const GroupsPage = dynamic(() => import('../../src/Pages/Groups/GroupsPage.tsx'), { ssr: false });
// const CreateGroupPage = dynamic(() => import('../../src/Pages/Groups/SubPage/CreateGroups/CreateGroupsPage.tsx'), { ssr: false });
// const LoginPage = dynamic(() => import('../../src/Pages/Login/LoginPage.tsx'), { ssr: false });
// const ProfilePage = dynamic(() => import('../../src/Pages/Profile/Profile.tsx'), { ssr: false });
// const RegisterPage = dynamic(() => import('../../src/Pages/Register/RegisterPage.tsx'), { ssr: false });
// const BlogPage = dynamic(() => import('../../src/Pages/Blog/BlogPage.tsx'), { ssr: false });
// const BlogDetail = dynamic(() => import('../../src/Base/Details/BlogDetails/BlogDetail.tsx'), { ssr: false });
// const PostDetail = dynamic(() => import('../../src/Base/Details/PostDetail/PostDetail.tsx'));
// const TagsDetail = dynamic(() => import('../../src/Base/Details/TagsDetails/TagsDetails.tsx'), { ssr: false });
// const GroupDetail = dynamic(() => import('../../src/Base/Details/GroupsDetails/GroupDetail.tsx'), { ssr: false });
// const SettingsPage = dynamic(() => import('../../src/Pages/Settings/SettingsPage.tsx'), { ssr: false });
// const MessagePage = dynamic(() => import('../../src/Pages/Message/MessagePage.tsx'), { ssr: false });
// const NotificationsPage = dynamic(() => import('../../src/Pages/Notifications/NotificationsPage.tsx'), { ssr: false });
// const ActivityPage = dynamic(() => import('../../src/Pages/Activity/ActivityPage.tsx'), { ssr: false });
// const GlobalPage = dynamic(() => import('../../src/Pages/Global/GlobalPage.tsx'), { ssr: false });
// const SearchPage = dynamic(() => import('../../src/Pages/Search/SearchPage.tsx'), { ssr: false });
// const NotFoundPage = dynamic(() => import('../../src/Pages/ErrorPages/404/404.tsx'), { ssr: false });
// const ServerErrorPage = dynamic(() => import('../../src/Pages/ErrorPages/500/500.tsx'), { ssr: false });
// const ForbiddenPage = dynamic(() => import('../../src/Pages/ErrorPages/403/403.tsx'), { ssr: false });
// const CategoryDetails = dynamic(() => import('../../src/Base/Details/CategoryDetails/CategoryDetails.tsx'), { ssr: false });
// const LostPasswordPage = dynamic(() => import('../../src/Pages/LostPassword/LostPasswordPage.tsx'), { ssr: false });
// const CommunicationPage = dynamic(() => import('../../src/Pages/Communication/CommunicationPage.tsx'), { ssr: false });
// const ERR_NETWORKPage = dynamic(() => import('../../src/Pages/ErrorPages/Server/ERR_NETWORK.tsx'), { ssr: false });
// const AuthorDetail = dynamic(() => import('../../src/Base/Details/AuthorDetails/AuthorDetail.tsx'), { ssr: false });


// const MainLayout = ({ children }: { children: React.ReactNode }) => (
//     <div>
//         <main>{children}</main>
//     </div>
// );

// export default function Home() {
//     return (
//         <Router>
//             <Suspense fallback={<div>Loading..</div>}>
//                 <Routes>
//                     {/* Root Route */}
//                     <Route path="/" element={<HomePage />} />

//                     {/* About Page */}
//                     <Route path="/About" element={<AboutPage />} />

//                     {/* Main Section with nested routes */}
//                     <Route element={<MainLayout children={undefined} />}>
//                         {/* Groups Routes */}
//                         <Route path="/Groups" element={<GroupsPage />} />
//                         <Route path="/Groups/CreateGroups" element={<CreateGroupPage />} />
//                         <Route path="/Groups/:groupname" element={<GroupDetail />} />

//                         {/* Blogs Routes */}
//                         <Route path="/Blogs" element={<BlogPage />} />
//                         <Route path="/Blogs/:author/:blogurl" element={<BlogDetail />} />

//                         {/* Profile Routes */}
//                         <Route path="/Profile" element={<ProfilePage />} />
//                         <Route path="/Profile/:username" element={<ProfilePage />} />

//                         {/* Message Routes */}
//                         <Route path="/Messages" element={<MessagePage />} />
//                         <Route path="/Messages/:username" element={<MessagePage />} />

//                         {/* Notifications Routes */}
//                         <Route path="/:username/Notifications" element={<NotificationsPage />} />

//                         {/* Activity Routes */}
//                         <Route path="/:username/Activity" element={<ActivityPage />} />

//                         {/* Settings */}
//                         <Route path="/Settings" element={<SettingsPage />} />

//                         {/* Search */}
//                         <Route path="/Search" element={<SearchPage />} />

//                         {/* Communication */}
//                         <Route path="/Communication" element={<CommunicationPage />} />

//                         {/* Lost Password */}
//                         <Route path="/LostPassword" element={<LostPasswordPage />} />

//                         {/* Error Pages */}
//                         <Route path="/404" element={<NotFoundPage />} />
//                         <Route path="/403" element={<ForbiddenPage />} />
//                         <Route path="/500" element={<ServerErrorPage />} />
//                         <Route path="/NetworkError" element={<ERR_NETWORKPage />} />
//                     </Route>

//                     {/* Catch-all Route (404 page) */}
//                     <Route path="*" element={<Navigate to="/404" />} />
//                 </Routes>
//             </Suspense>
//         </Router>
//     );
// }
