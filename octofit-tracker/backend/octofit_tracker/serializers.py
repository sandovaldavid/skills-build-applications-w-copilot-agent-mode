from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout
from bson import ObjectId

class ObjectIdField(serializers.Field):
    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        return ObjectId(data)

class UserSerializer(serializers.ModelSerializer):
    _id = ObjectIdField()

    class Meta:
        model = User
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    _id = ObjectIdField()
    members = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = '__all__'
        
    def get_members(self, obj):
        return [UserSerializer(user).data for user in obj.members.all()]

class ActivitySerializer(serializers.ModelSerializer):
    _id = ObjectIdField()
    user_id = ObjectIdField(source='user._id')
    
    class Meta:
        model = Activity
        fields = '__all__'
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Convert any remaining ObjectId fields to strings
        for field in representation:
            if isinstance(representation[field], ObjectId):
                representation[field] = str(representation[field])
        return representation

class LeaderboardSerializer(serializers.ModelSerializer):
    _id = ObjectIdField()
    user_id = ObjectIdField(source='user._id')

    class Meta:
        model = Leaderboard
        fields = '__all__'
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        for field in representation:
            if isinstance(representation[field], ObjectId):
                representation[field] = str(representation[field])
        return representation

class WorkoutSerializer(serializers.ModelSerializer):
    _id = ObjectIdField()

    class Meta:
        model = Workout
        fields = '__all__'
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        for field in representation:
            if isinstance(representation[field], ObjectId):
                representation[field] = str(representation[field])
        return representation