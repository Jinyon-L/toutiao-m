import { login, sendSms, refreshToken, getUserInfo, addFollow, deleteFollow, getUserProfile, updateUserProfile, updateUserPhoto } from './user'
import { getChannels, getAllchannels, getAddchannel, deleteChannel } from './channels'
import { getArticles, getArticlesById, deleteCollect, addCollect, addLike, deleteLike } from './articles'
import { getSearch, getSearchSesults } from './search'
import { getComments, addCommentLike, deleteCommentLike, addComment } from './comment'

export const loginAPI = login
export const refreshTokenAPI = refreshToken
export const sendSmsAPI = sendSms
export const getUserInfoAPI = getUserInfo
export const getChannelsAPI = getChannels
export const getArticlesAPI = getArticles
export const getAllchannelsAPI = getAllchannels
export const getAddchannelAPI = getAddchannel
export const deleteChannelAPI = deleteChannel
export const getSearchAPI = getSearch
export const getSearchSesultsAPI = getSearchSesults
export const getArticlesByIdAPI = getArticlesById
export const addFollowAPI = addFollow
export const deleteFollowAPI = deleteFollow
export const deleteCollectAPI = deleteCollect
export const addCollectAPI = addCollect
export const addLikeAPI = addLike
export const deleteLikeAPI = deleteLike
export const getCommentsAPI = getComments
export const addCommentLikeAPI = addCommentLike
export const deleteCommentLikeAPI = deleteCommentLike
export const addCommentAPI = addComment
export const getUserProfileAPI = getUserProfile
export const updateUserProfileAPI = updateUserProfile
export const updateUserPhotoAPI = updateUserPhoto
