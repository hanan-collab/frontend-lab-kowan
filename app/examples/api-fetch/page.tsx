'use client';

import { useGet, useCreate } from '@/lib/hooks/useApi';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/design-export/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/design-export/components/ui/table';
import { Button } from '@/components/design-export/components/ui/button';
import { Loader2, PlusCircle, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import { SectionHeader } from '@/components/design-export/components/ui/section-header';
import { usePathname } from 'next/navigation';
import { getMenuItemByPath } from '@/config/menu';

// Types
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface NewPost {
  title: string;
  body: string;
  userId: number;
}

export default function ApiFetchExample() {
  const pathname = usePathname();
  const menuItem = getMenuItemByPath(pathname);

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Query: Fetch Posts (using wrapper)
  const { data: posts, isLoading, isError, error, refetch } = useGet<Post[]>('/posts');

  // Mutation: Create Post (using wrapper)
  const createPost = useCreate<NewPost, Post>('/posts', {
    onSuccess: () => {
      toast.success('Post created successfully!');
      refetch();
    },
    onError: err => {
      const message = (err as any)?.message || 'Unknown error';
      toast.error('Failed to create post: ' + message);
    },
  });

  // Handle manual refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
    toast.success('Data refreshed!');
  };

  // Handle create example post
  const handleCreatePost = () => {
    createPost.mutate({
      title: 'New Post Example',
      body: 'This is an example post created with React Query mutation.',
      userId: 1,
    });
  };

  if (isError) {
    return (
      <Card className="bg-red-900/20 border-red-900/30">
        <CardContent className="pt-6">
          <div className="text-red-400">Error loading data: {(error as Error).message}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <SectionHeader title={menuItem?.title} subtitle={menuItem?.subtitle} />
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading || isRefreshing}>
            {isRefreshing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCcw className="w-4 h-4 mr-2" />
            )}
            Refresh
          </Button>
          <Button onClick={handleCreatePost} disabled={createPost.isPending}>
            {createPost.isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <PlusCircle className="w-4 h-4 mr-2" />
            )}
            Create Post
          </Button>
        </div>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle>Posts from JSONPlaceholder API</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">ID</TableHead>
                  <TableHead className="text-slate-300">Title</TableHead>
                  <TableHead className="text-slate-300">Content</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts?.slice(0, 10).map(post => (
                  <TableRow key={post.id} className="border-slate-700">
                    <TableCell className="text-slate-300">{post.id}</TableCell>
                    <TableCell className="text-slate-300 font-medium">{post.title}</TableCell>
                    <TableCell className="text-slate-400">{post.body.slice(0, 100)}...</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle>Implementation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Features Demonstrated:</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li>Data fetching with React Query</li>
              <li>Mutations for creating data</li>
              <li>Loading states</li>
              <li>Error handling</li>
              <li>Manual refetching</li>
              <li>Toast notifications</li>
              <li>TypeScript integration</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Key Components Used:</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li>@tanstack/react-query for data management</li>
              <li>axios for API requests</li>
              <li>sonner for toast notifications</li>
              <li>Radix UI components</li>
              <li>Tailwind CSS for styling</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
