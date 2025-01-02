// import React, { Suspense, lazy } from 'react';

// // Dynamically import pages (simulating file-based routing)
// const HomePage = lazy(() => import('./src/Pages/Home/HomePage.tsx'));
// const AboutPage = lazy(() => import('./src/Pages/About/About.tsx'));
// const GroupsPage = lazy(() => import('./src/Pages/Groups/GroupsPage.tsx'));
// const CreateGroupPage = lazy(() => import('./src/Pages/Groups/SubPage/CreateGroups/CreateGroupsPage.tsx'));
// const LoginPage = lazy(() => import('./src/Pages/Login/LoginPage.tsx'));
// const ProfilePage = lazy(() => import('./src/Pages/Profile/Profile.tsx'));
// const RegisterPage = lazy(() => import('./src/Pages/Register/RegisterPage.tsx'));
// const BlogPage = lazy(() => import('./src/Pages/Blog/BlogPage.tsx'));
// const BlogDetail = lazy(() => import('./src/Base/Details/BlogDetails/BlogDetail.tsx'));
// const PostDetail = lazy(() => import('./src/Base/Details/PostDetail/PostDetail.tsx'));
// const TagsDetail = lazy(() => import('./src/Base/Details/TagsDetails/TagsDetails.tsx'));
// const GroupDetail = lazy(() => import('./src/Base/Details/GroupsDetails/GroupDetail.tsx'));
// const SettingsPage = lazy(() => import('./src/Pages/Settings/SettingsPage.tsx'));
// const MessagePage = lazy(() => import('./src/Pages/Message/MessagePage.tsx'));
// const NotificationsPage = lazy(() => import('./src/Pages/Notifications/NotificationsPage.tsx'));
// const ActivityPage = lazy(() => import('./src/Pages/Activity/ActivityPage.tsx'));
// const GlobalPage = lazy(() => import('./src/Pages/Global/GlobalPage.tsx'));
// const SearchPage = lazy(() => import('./src/Pages/Search/SearchPage.tsx'));
// const NotFoundPage = lazy(() => import('./src/Pages/ErrorPages/404/404.tsx'));
// const ServerErrorPage = lazy(() => import('./src/Pages/ErrorPages/500/500.tsx'));
// const ForbiddenPage = lazy(() => import('./src/Pages/ErrorPages/403/403.tsx'));
// const CategoryDetails = lazy(() => import('./src/Base/Details/CategoryDetails/CategoryDetails.tsx'));
// const LostPasswordPage = lazy(() => import('./src/Pages/LostPassword/LostPasswordPage.tsx'));
// const CommunicationPage = lazy(() => import('./src/Pages/Communication/CommunicationPage.tsx'));
// const ERR_NETWORKPage = lazy(() => import('./src/Pages/ErrorPages/Server/ERR_NETWORK.tsx'));
// const AuthorDetail = lazy(() => import('./src/Base/Details/AuthorDetails/AuthorDetail.tsx'));

// // Main Layout Wrapper (Could be used for page-specific layouts)
// const MainLayout = ({ children }: { children: React.ReactNode }) => (
//   <div>
//     {/* Insert Header or SideBar or other common layout components */}
//     <main>{children}</main>
//   </div>
// );

// export default function App() {
//   return (
//     <Router>
//       <Suspense fallback={<div>Loading..</div>}>
//         <Routes>
//           {/* Root Route */}
//           <Route path="/" element={<HomePage />} />

//           {/* About Page */}
//           <Route path="/About" element={<AboutPage />} />

//           {/* Main Section with nested routes */}
//           <Route element={<MainLayout children={undefined} />}>
//             {/* Groups Routes */}
//             <Route path="/Groups" element={<GroupsPage />} />
//             <Route path="/Groups/CreateGroups" element={<CreateGroupPage />} />
//             <Route path="/Groups/:groupname" element={<GroupDetail />} />

//             {/* Blogs Routes */}
//             <Route path="/Blogs" element={<BlogPage />} />
//             <Route path="/Blogs/:author/:blogurl" element={<BlogDetail />} />

//             {/* Profile Routes */}
//             <Route path="/Profile" element={<ProfilePage />} />
//             <Route path="/Profile/:username" element={<ProfilePage />} />

//             {/* Message Routes */}
//             <Route path="/Messages" element={<MessagePage />} />
//             <Route path="/Messages/:username" element={<MessagePage />} />

//             {/* Notifications Routes */}
//             <Route path="/:username/Notifications" element={<NotificationsPage />} />

//             {/* Activity Routes */}
//             <Route path="/:username/Activity" element={<ActivityPage />} />

//             {/* Settings */}
//             <Route path="/Settings" element={<SettingsPage />} />

//             {/* Search */}
//             <Route path="/Search" element={<SearchPage />} />

//             {/* Communication */}
//             <Route path="/Communication" element={<CommunicationPage />} />

//             {/* Lost Password */}
//             <Route path="/LostPassword" element={<LostPasswordPage />} />

//             {/* Error Pages */}
//             <Route path="/404" element={<NotFoundPage />} />
//             <Route path="/403" element={<ForbiddenPage />} />
//             <Route path="/500" element={<ServerErrorPage />} />
//             <Route path="/NetworkError" element={<ERR_NETWORKPage />} />
//           </Route>

//           {/* Catch-all Route (404 page) */}
//           <Route path="*" element={<Navigate to="/404" />} />
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// }
