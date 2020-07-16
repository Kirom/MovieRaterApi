from django.urls import path, include
from rest_framework import routers

from api.views import RatingViewSet, MovieViewSet, UserViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('movies', MovieViewSet)
router.register('ratings', RatingViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
