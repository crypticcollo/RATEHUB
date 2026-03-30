import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/ToastProvider';
import { Button } from '/components/ui/button';
import { Input } from '/components/ui/input';
import { Label } from '/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '/components/ui/card';
import { Star, Settings, Trash2, Calendar, Edit3 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ProfileViewProps {
  products: any[];
  onDeleteReview: (productId: string, reviewId: string) => void;
  onUpdateUserName: (newName: string) => void;
}

export function ProfileView({ products, onDeleteReview, onUpdateUserName }: ProfileViewProps) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || '');

  if (!user) return null;

  const userReviews = products.flatMap(product =>
    product.reviews
      .filter(review => review.userId === user.id)
      .map(review => ({ ...review, productName: product.name, productId: product.id }))
  ).sort((a, b) => b.date.getTime() - a.date.getTime());

  const handleUpdateName = () => {
    if (!nameInput.trim()) {
      showToast('Name cannot be empty', 'error');
      return;
    }
    onUpdateUserName(nameInput.trim());
    setIsEditing(false);
    showToast('Profile updated successfully', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">My Profile</h1>
        <p className="text-slate-600">Manage your account and review history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: User Info */}
        <div className="lg:col-span-1">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Account Info
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? <span>Cancel</span> : <Edit3 size={16} />}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                
                {isEditing ? (
                  <div className="w-full space-y-2">
                    <Label htmlFor="userName" className="text-left">Display Name</Label>
                    <Input
                      id="userName"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full"
                      autoFocus
                    />
                    <Button onClick={handleUpdateName} className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
                    <p className="text-slate-600 text-sm">{user.email}</p>
                    <div className="inline-flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full text-xs font-medium text-slate-600 mt-2">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </div>
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{userReviews.length}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">
                    {userReviews.length > 0 
                      ? (userReviews.reduce((acc, r) => acc + r.rating, 0) / userReviews.length).toFixed(1)
                      : '0.0'
                    }
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Avg Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Reviews */}
        <div className="lg:col-span-2">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star size={20} className="text-amber-500 fill-amber-500" />
                My Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userReviews.length === 0 ? (
                <div className="text-center py-12">
                  <Star size={48} className="text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No reviews yet</h3>
                  <p className="text-slate-600 mb-6">Start sharing your experiences with the community!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userReviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-slate-900 truncate">{review.productName}</h4>
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={i < review.rating ? "text-amber-500 fill-amber-500" : "text-slate-300"}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-slate-600 text-sm mb-2 line-clamp-2">{review.comment}</p>
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Calendar size={12} />
                            {formatDistanceToNow(review.date, { addSuffix: true })}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteReview(review.productId, review.id)}
                          className="text-slate-400 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0 flex-shrink-0"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}