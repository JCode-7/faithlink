-- Verify Faith-Link database setup
-- Run this to check if everything was created correctly

SELECT 'Users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'Posts', COUNT(*) FROM posts
UNION ALL
SELECT 'Comments', COUNT(*) FROM comments
UNION ALL
SELECT 'Likes', COUNT(*) FROM likes
UNION ALL
SELECT 'Groups', COUNT(*) FROM groups
UNION ALL
SELECT 'Group Memberships', COUNT(*) FROM group_memberships
UNION ALL
SELECT 'Prayer Requests', COUNT(*) FROM prayer_requests
UNION ALL
SELECT 'Bible Verses', COUNT(*) FROM bible_verses
UNION ALL
SELECT 'User Preferences', COUNT(*) FROM user_preferences;

-- Show sample data
SELECT 'Sample Posts:' as info;
SELECT p.id, u.first_name, u.last_name, p.post_type, LEFT(p.content, 50) as content_preview, p.likes_count, p.comments_count
FROM posts p 
JOIN users u ON p.user_id = u.id 
ORDER BY p.created_at DESC 
LIMIT 5;
