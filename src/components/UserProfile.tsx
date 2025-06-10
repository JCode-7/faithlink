"use client";
import { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
  TextField,
  Alert,
  Skeleton,
  Divider,
} from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import { useAuth } from "@/components/providers/AuthProvider";
import { supabase, TABLES } from "@/lib/supabase";

export default function UserProfile() {
  const { user, loading: authLoading } = useAuth();
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userStats, setUserStats] = useState({
    prayerCount: 0,
    likesReceived: 0,
  });

  useEffect(() => {
    if (user) {
      setUsername(user.user_metadata?.username || "");
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    if (!user) return;

    try {
      // Get prayer count
      const { count: prayerCount } = await supabase
        .from(TABLES.PRAYERS)
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      // Get total likes received
      const { data: prayers } = await supabase
        .from(TABLES.PRAYERS)
        .select("likes")
        .eq("user_id", user.id);

      const likesReceived =
        prayers?.reduce(
          (total, prayer) => total + (prayer.likes?.length || 0),
          0
        ) || 0;

      setUserStats({
        prayerCount: prayerCount || 0,
        likesReceived,
      });
    } catch (err) {
      console.error("Error fetching user stats:", err);
    }
  };

  const handleSave = async () => {
    if (!user || !username.trim()) {
      setError("Username cannot be empty");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Update user metadata in Supabase Auth
      const { error: authError } = await supabase.auth.updateUser({
        data: { username: username.trim() },
      });

      if (authError) throw authError;

      // Update user profile in database
      const { error: dbError } = await supabase
        .from(TABLES.USER_PROFILES)
        .update({ username: username.trim() })
        .eq("id", user.id);

      if (dbError) {
        console.error("Database update error:", dbError);
        // Don't throw here as the auth update succeeded
      }

      setSuccess("Profile updated successfully!");
      setEditing(false);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setUsername(user?.user_metadata?.username || "");
    setEditing(false);
    setError(null);
    setSuccess(null);
  };

  if (authLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card>
          <CardContent sx={{ textAlign: "center", py: 4 }}>
            <Skeleton
              variant="circular"
              width={120}
              height={120}
              sx={{ mx: "auto", mb: 2 }}
            />
            <Skeleton
              variant="text"
              width={200}
              height={40}
              sx={{ mx: "auto", mb: 1 }}
            />
            <Skeleton
              variant="text"
              width={150}
              height={20}
              sx={{ mx: "auto" }}
            />
          </CardContent>
        </Card>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning">Please sign in to view your profile.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card>
        <CardContent sx={{ textAlign: "center", py: 4 }}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              mx: "auto",
              mb: 2,
              bgcolor: "primary.main",
              fontSize: "3rem",
            }}
          >
            {(user.user_metadata?.username || user.email)
              ?.charAt(0)
              .toUpperCase()}
          </Avatar>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          {editing ? (
            <Box sx={{ mb: 3 }}>
              <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                sx={{ mb: 2, maxWidth: 300 }}
                error={!username.trim()}
                helperText={!username.trim() ? "Username is required" : ""}
              />
              <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  disabled={loading || !username.trim()}
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" gutterBottom>
                {user.user_metadata?.username || "Anonymous"}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {user.email}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setEditing(true)}
                sx={{ mt: 1 }}
              >
                Edit Profile
              </Button>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Your Faith Journey
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 2 }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="primary">
                {userStats.prayerCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Prayers Shared
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="secondary">
                {userStats.likesReceived}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hearts Received
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            Member since {new Date(user.created_at).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
