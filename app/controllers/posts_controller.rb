# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.includes(:user, :organization, :categories).all

    render status: :ok, json: {
      posts: posts.as_json(
        include: {
          user: { only: [:id, :name] },
          organization: { only: [:id, :name] },
          categories: { only: [:id, :name] }
        },
        except: [:user_id, :organization_id]
      )
    }
  end

  def create
    post = Post.new(post_params.except(:category_ids))
    post.category_ids = post_params[:category_ids] if post_params[:category_ids]
    post.save!
    render_notice(t("successfully_updated", entity: "Post"))
  end

  def show
    post = Post.includes(:user, :categories).find_by!(slug: params[:slug])
    render json: {
      post: post.as_json(
        only: [:id, :title, :description, :created_at],
        include: {
          user: { only: [:id, :name] },
          categories: { only: [:id, :name] }
        }
      )
    }
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, category_ids: [])
    end
end
