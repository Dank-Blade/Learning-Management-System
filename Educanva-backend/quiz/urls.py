from django.urls import path
from rest_framework import routers

from . import views

urlpatterns = [
    path('create/', views.ListCreateQuiz.as_view(), name='quiz_list'),
    path('<int:pk>/', views.RetrieveUpdateDestroyQuiz.as_view(), name='quiz_detail'),
    path('<int:quiz_pk>/questions/', views.ListCreateQuestion.as_view(), name='question_list'),
    path('<int:quiz_pk>/questions/<int:pk>/', views.RetrieveUpdateDestroyQuestion.as_view(), name='question_detail'),
    path('<int:quiz_pk>/questions/<int:question_pk>/answers/', views.ListCreateAnswer.as_view(), name='answer_list'),
    path('<int:quiz_pk>/questions/<int:question_pk>/answers/<int:pk>/', views.RetrieveUpdateDestroyAnswer.as_view(), name='answer_detail'),
    # path('<int:quiz_pk>/take/', views.TakeQuiz.as_view(), name='take_quiz'),
    # path('takers/', views.ListQuizTakers.as_view(), name='quiz_takers'),
    # path('takers/<int:pk>/', views.RetrieveQuizTaker.as_view(), name='quiz_taker'),
    
]
