from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer
from .models import User, Team, Activity, Leaderboard, Workout

@api_view(['GET'])
def api_root(request, format=None):
    # Verificar si estamos en GitHub Codespaces
    codespace_name = None
    forwarded_host = request.META.get('HTTP_X_FORWARDED_HOST')
    github_codespace = request.META.get('HTTP_X_GITHUB_REQUEST')
    
    # Intentar detectar el nombre del Codespace desde las variables de entorno
    import os
    codespace_name = os.environ.get('CODESPACE_NAME')
    
    # Para depuración
    print(f"Forwarded host: {forwarded_host}")
    print(f"GitHub request: {github_codespace}")
    print(f"CODESPACE_NAME: {codespace_name}")
    print(f"Host detectado: {request.get_host()}")
    
    # Determinar la URL base basada en el entorno
    if codespace_name:
        # Estamos en GitHub Codespaces
        base_url = f"https://{codespace_name}-8000.app.github.dev"
    else:
        # Entorno local u otro
        base_url = request.build_absolute_uri('/').rstrip('/')
    
    print(f"URL base: {base_url}")
    
    return Response({
        'users': f"{base_url}/api/users/",
        'teams': f"{base_url}/api/teams/",
        'activities': f"{base_url}/api/activities/",
        'leaderboard': f"{base_url}/api/leaderboard/",
        'workouts': f"{base_url}/api/workouts/"
    })

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer