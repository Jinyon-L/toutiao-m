import { login, sendSms, getUserInfo, getChannels, getAllchannels, getAddchannel, deleteChannel } from './user'
import { getArticles } from './articles'

export const loginAPI = login
export const sendSmsAPI = sendSms
export const getUserInfoAPI = getUserInfo
export const getChannelsAPI = getChannels
export const getArticlesAPI = getArticles
export const getAllchannelsAPI = getAllchannels
export const getAddchannelAPI = getAddchannel
export const deleteChannelAPI = deleteChannel
