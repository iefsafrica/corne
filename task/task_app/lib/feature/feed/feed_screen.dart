import 'package:flutter/material.dart';
import 'package:task_app/feature/details/news_details_screen.dart';
import 'package:task_app/model/post_model.dart';
import 'package:task_app/service/api_service.dart';

class FeedScreen extends StatefulWidget {
  const FeedScreen({super.key});

  @override
  State<FeedScreen> createState() => _FeedScreenState();
}

class _FeedScreenState extends State<FeedScreen> {
  final _apiService = ApiService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Feed Screen')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: FutureBuilder<List<PostModel>>(
          future: _apiService.fetchNews(),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            } else if (snapshot.hasError) {
              return Center(child: Text('Error: ${snapshot.error}'));
            } else if (snapshot.hasData) {
              final posts = snapshot.data!;

              if (posts.isEmpty) {
                return const Center(child: Text('No posts available.'));
              }

              return ListView.builder(
                itemCount: posts.length,
                itemBuilder: (context, index) {
                  final post = posts[index];
                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 8.0),
                    elevation: 3,
                    child: ListTile(
                      leading: const Icon(Icons.article, color: Colors.teal),
                      title: Text(post.title ?? 'No Title'),
                      subtitle: Text(
                        post.body ?? 'No Body',
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => NewsDetailsScreen(model: post),
                          ),
                        );
                      },
                    ),
                  );
                },
              );
            } else {
              return const Center(child: Text('No data found.'));
            }
          },
        ),
      ),
    );
  }
}
