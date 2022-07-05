import { login, sendSms, refreshToken, getUserInfo, getChannels, getAllchannels, getAddchannel, deleteChannel } from './user'
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
