from django.urls import path
from .views import ContentCreateView, ContentListAPIView, ContentUpdateView, ContentDetailView, SubmissionCreateView, SubmissionListAPIView, SubmissionDetailView, SubmissionMarksUpdateView, SubmissionUpdateView

urlpatterns = [
    path('upload/', ContentCreateView.as_view(), name='file_upload'),
    path('list/<int:module_id>/', ContentListAPIView.as_view(), name='file_list'),
    path('content/<int:pk>/', ContentDetailView.as_view(), name='content_detail'),
    path('content/update/<int:pk>/', ContentUpdateView.as_view(), name='content_update'),
    path('submission/upload/', SubmissionCreateView.as_view(), name='submission_upload'),
    path('submission/list/<int:module_id>/', SubmissionListAPIView.as_view(), name='submission_list'),
    path('submission/<int:pk>/', SubmissionDetailView.as_view(), name='submission_detail'),
    path('submission/users/<int:pk>/', SubmissionMarksUpdateView.as_view(), name="submission_update"),
    path('submission/update/<int:pk>/', SubmissionUpdateView.as_view(), name='submission_update'),
]