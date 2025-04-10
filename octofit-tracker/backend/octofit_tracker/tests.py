from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import timedelta
from bson import ObjectId

class UserModelTest(TestCase):
    def setUp(self):
        User.objects.create(_id=ObjectId(), username="testuser", email="test@example.com", password="testpass")
    
    def test_user_creation(self):
        user = User.objects.get(username="testuser")
        self.assertEqual(user.email, "test@example.com")

class TeamModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(_id=ObjectId(), username="teammember", email="team@example.com", password="teampass")
        self.team = Team.objects.create(_id=ObjectId(), name="Test Team")
        
    def test_team_creation(self):
        team = Team.objects.get(name="Test Team")
        self.assertEqual(team.name, "Test Team")

class ActivityModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(_id=ObjectId(), username="activityuser", email="activity@example.com", password="activitypass")
        Activity.objects.create(_id=ObjectId(), user=self.user, activity_type="Running", duration=timedelta(hours=1))
    
    def test_activity_creation(self):
        activity = Activity.objects.get(activity_type="Running")
        self.assertEqual(activity.user.username, "activityuser")

class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(_id=ObjectId(), username="leaderboarduser", email="leaderboard@example.com", password="leaderboardpass")
        Leaderboard.objects.create(_id=ObjectId(), user=self.user, score=100)
    
    def test_leaderboard_creation(self):
        leaderboard = Leaderboard.objects.get(score=100)
        self.assertEqual(leaderboard.user.username, "leaderboarduser")

class WorkoutModelTest(TestCase):
    def setUp(self):
        Workout.objects.create(_id=ObjectId(), name="Test Workout", description="Test workout description")
    
    def test_workout_creation(self):
        workout = Workout.objects.get(name="Test Workout")
        self.assertEqual(workout.description, "Test workout description")