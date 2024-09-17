from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from .models import Book

User = get_user_model()

class BookModelTests(APITestCase):
    def setUp(self):
        self.book = Book.objects.create(
            title='Test Book',
            author='Test Author',
            description='Test Description',
            published_date='2023-09-01',
            price='19.99'
        )

    def test_book_creation(self):
        self.assertEqual(self.book.title, 'Test Book')
        self.assertEqual(self.book.author, 'Test Author')
        self.assertEqual(self.book.description, 'Test Description')
        self.assertEqual(self.book.published_date, '2023-09-01')
        self.assertEqual(self.book.price, '19.99')

    def test_book_string_representation(self):
        self.assertEqual(str(self.book), 'Test Book')


class BookViewSetTests(APITestCase):
    def setUp(self):
        self.book_list_url = reverse('book-list')
        self.book_detail_url = lambda book_id: reverse('book-detail', args=[book_id])
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.login(username='testuser', password='testpassword')
        self.book = Book.objects.create(
            title='Test Book',
            author='Test Author',
            description='Test Description',
            published_date='2023-09-01',
            price='19.99'
        )
        self.book_data = {
            'title': 'New Test Book',
            'author': 'New Test Author',
            'description': 'New Test Description',
            'published_date': '2024-01-01',
            'price': '29.99'
        }

    def test_book_list(self):
        response = self.client.get(self.book_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_book_creation(self):
        response = self.client.post(self.book_list_url, self.book_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'New Test Book')

    def test_book_detail(self):
        response = self.client.get(self.book_detail_url(self.book.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Test Book')

    def test_book_update(self):
        response = self.client.put(self.book_detail_url(self.book.id), self.book_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'New Test Book')

    def test_book_deletion(self):
        response = self.client.delete(self.book_detail_url(self.book.id))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response = self.client.get(self.book_list_url)
        self.assertEqual(len(response.data), 0)
