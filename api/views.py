from django.contrib.auth.models import User
from django.db import IntegrityError
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response

from api.models import Movie, Rating
from api.serializers import MovieSerializer, RatingSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    authentication_classes = (TokenAuthentication,)

    @action(methods=['POST'], detail=True)
    def rate_movie(self, request, pk=None):
        if 'stars' in request.data:
            movie = Movie.objects.get(pk=pk)
            stars = request.data['stars']
            user = request.user
        try:
            rating = Rating.objects.create(movie=movie, user=user, stars=stars)
            serializer = RatingSerializer(rating, many=False)
            response = {'message': 'Rating created!', 'result': serializer.data}
            return Response(response)
        except IntegrityError as exc:
            if 'UNIQUE' in str(exc):
                rating = Rating.objects.get(movie=movie, user=user)
                rating.stars = stars
                rating.save()
                serializer = RatingSerializer(rating, many=False)
                response = {'message': 'Rating updated!', 'result': serializer.data}
                return Response(response)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = (TokenAuthentication,)
