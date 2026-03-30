import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from './ToastProvider';
import { Modal } from './Modal';
import { Button } from '/components/ui/button';
import { Input } from '/components/ui/input';
import { Label } from '/components/ui/label';
import { Card, CardContent } from '/components/ui/card';
import { Star, Settings, Trash2, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: any[];
  onDeleteReview: (productId: string, reviewId: string) => void;
  onUpdateUserName: (newName: string) => void;
}

export function ProfileModal({ open, onOpenChange, products, onDeleteReview, onUpdateUserName }: ProfileModalProps) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || '');

  if (!user) return null;

  // Find all reviews by this user
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
    <Modal open={open} onOpenChange={onOpenChange}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">My Profile</h2>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setNameInput(user.name); }} className="text-slate-400">
                  Cancel
                </Button>
                <Button size="sm" onClick={handleUpdateName} className="bg-amber-500 hover:bg-amber-600 text-white">
                  Save
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="text-slate-400">
                <Settings size={16} className="mr-1" />
                Edit
              </Button>
            )}
          </div>
        </div>

        {/* User Info Card */}
        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center border-2 border-amber-500">
                <span className="text-2xl font-bold text-amber-500">{user.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <Label htmlFor="userName" className="text-slate-400 text-xs">Display Name</Label>
                    <Input
                      id="userName"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      autoFocus
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-white">{user.name}</h3>
                    <p className="text-slate-400 text-sm">{user.email}</p>
                  </>
                )}
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{userReviews.length}</div>
                <div className="text-slate-400 text-xs uppercase tracking-wide">Reviews</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My Reviews Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Star size={18} className="text-amber-500 fill-amber-500" />
            My Reviews
          </h3>
          
          {userReviews.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
              <Star size={48} className="text-slate-700 mx-auto mb-3" />
              <p className="text-slate-400">You haven't written any reviews yet.</p>
              <p className="text-slate-500 text-sm mt-1">Use the + button to add your first review!</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {userReviews.map((review) => (
                <Card key={review.id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-white text-sm truncate">{review.productName}</span>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={i < review.rating ? "text-amber-500 fill-amber-500" : "text-slate-600"}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-400 text-sm line-clamp-2">{review.comment}</p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                          <Calendar size={10} />
                          {formatDistanceToNow(review.date, { addSuffix: true })}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteReview(review.productId, review.id)}
                        className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}