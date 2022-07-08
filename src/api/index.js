import { login, sendSms, refreshToken, getUserInfo, addFollow, deleteFollow } from './user'
import { getChannels, getAllchannels, getAddchannel, deleteChannel } from './channels'
import { getArticles, getArticlesById } from './articles'
import { getSearch, getSearchSesults } from './search'

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
