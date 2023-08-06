from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
# from rest_framework.permissions import isAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import File, Submission
from module.models import Module
from .serializers import FileSerializer, SubmissionSerializer, SubmissionMarksUpdateSerializer, SubmissionUpdateSerializer  
from django.http import HttpResponse, Http404, FileResponse
from django.conf import settings
from django.views import View
from rest_framework import permissions
from rest_framework import generics

import os

class ContentCreateView(generics.CreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    # def perform_create(self, serializer):
    #     module_id = self.kwargs.get('module_id')
    #     module = Module.objects.get(id=module_id)
    #     serializer.save(module=module, uploaded_by=self.request.user)
    
    def post(self, request, *args, **kwargs):
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class ContentListAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FileSerializer

    def get_queryset(self):
        module_id = self.kwargs['module_id']
        return File.objects.filter(module_id=module_id)

    
class ContentDetailView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        try:
            return File.objects.get(pk=pk)
        except File.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        content = self.get_object(pk)
        file_path = content.file.path
        response = FileResponse(open(file_path, 'rb'))
        # response['content_type'] = 'application/pdf'
        response['Content-Disposition'] = f'attachment; filename="{content.file.name}"'
        return response

    def delete(self, request, pk, format=None):
        content = self.get_object(pk)
        content.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class SubmissionCreateView(generics.CreateAPIView):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    # def perform_create(self, serializer):
    #     module_id = self.kwargs.get('module_id')
    #     module = Module.objects.get(id=module_id)
    #     serializer.save(module=module, uploaded_by=self.request.user)
    
    def post(self, request, *args, **kwargs):
        file_serializer = SubmissionSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class SubmissionListAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SubmissionSerializer

    def get_queryset(self):
        module_id = self.kwargs['module_id']
        return Submission.objects.filter(module_id=module_id)
    
    
class SubmissionDetailView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        try:
            return Submission.objects.get(pk=pk)
        except Submission.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        content = self.get_object(pk)
        file_path = content.file.path
        response = FileResponse(open(file_path, 'rb'))
        # response['content_type'] = 'application/pdf'
        response['Content-Disposition'] = f'attachment; filename="{content.file.name}"'
        return response

    def delete(self, request, pk, format=None):
        content = self.get_object(pk)
        content.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
    
class SubmissionMarksUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Submission.objects.all()
    serializer_class = SubmissionMarksUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    # parser_classes = [MultiPartParser, FormParser]

    # def perform_create(self, serializer):
    #     module_id = self.kwargs.get('module_id')
    #     module = Module.objects.get(id=module_id)
    #     serializer.save(module=module, uploaded_by=self.request.user)
    
    # def post(self, request, *args, **kwargs):
    #     file_serializer = SubmissionSerializer(data=request.data)
    #     if file_serializer.is_valid():
    #         file_serializer.save()
    #         return Response(file_serializer.data, status=status.HTTP_201_CREATED)
    #     else:
    #         return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class ContentUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    
    

class SubmissionUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Submission.objects.all()
    serializer_class = SubmissionUpdateSerializer