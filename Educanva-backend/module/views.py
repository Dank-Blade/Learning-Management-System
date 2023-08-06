from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import ModuleSerializer
from rest_framework import generics
from .models import Module
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import permissions


class CreateModule(generics.CreateAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAdminUser]

class ModuleView(generics.ListCreateAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    
class ModuleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAdminUser]