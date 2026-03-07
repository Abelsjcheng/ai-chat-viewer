import type {
  GetSessionMessageParams,
  GetSessionMessageResult,
  RegisterSessionListenerParams,
  UnregisterSessionListenerParams,
  SendMessageParams,
  SendMessageResult,
  StopSkillParams,
  StopSkillResult,
  SendMessageToIMParams,
  SendMessageToIMResult,
  ControlSkillWeCodeParams,
  ControlSkillWeCodeResult,
  StreamMessage,
  SessionError,
} from '../types/jsapi';

/**
 * 检查 JSAPI 是否可用
 */
function checkJSAPI(): boolean {
  return typeof window !== 'undefined' && typeof window.HWH5 !== 'undefined';
}

/**
 * 获取会话消息列表
 */
export async function getSessionMessage(
  params: GetSessionMessageParams
): Promise<GetSessionMessageResult> {
  if (!checkJSAPI()) {
    console.warn('JSAPI 不可用，使用 mock 数据');
    return {
      content: [],
      totalElements: 0,
      totalPages: 0,
      number: 0,
      size: params.size || 50,
    };
  }

  try {
    const result = await window.HWH5!.getSessionMessage(params);
    return result;
  } catch (error: any) {
    console.error('获取会话消息失败:', error);
    throw error;
  }
}

/**
 * 注册会话监听器
 */
export function registerSessionListener(params: RegisterSessionListenerParams): void {
  if (!checkJSAPI()) {
    console.warn('JSAPI 不可用，无法注册监听器');
    return;
  }

  try {
    window.HWH5!.registerSessionListener(params);
  } catch (error: any) {
    console.error('注册会话监听器失败:', error);
    throw error;
  }
}

/**
 * 注销会话监听器
 */
export function unregisterSessionListener(params: UnregisterSessionListenerParams): void {
  if (!checkJSAPI()) {
    console.warn('JSAPI 不可用，无法注销监听器');
    return;
  }

  try {
    window.HWH5!.unregisterSessionListener(params);
  } catch (error: any) {
    console.error('注销会话监听器失败:', error);
    throw error;
  }
}

/**
 * 发送消息
 */
export async function sendMessage(params: SendMessageParams): Promise<SendMessageResult> {
  if (!checkJSAPI()) {
    console.warn('JSAPI 不可用，使用 mock 响应');
    return {
      messageId: Date.now(),
      seq: 1,
      createdAt: new Date().toISOString(),
    };
  }

  try {
    const result = await window.HWH5!.sendMessage(params);
    return result;
  } catch (error: any) {
    console.error('发送消息失败:', error);
    throw error;
  }
}

/**
 * 停止技能生成
 */
export async function stopSkill(params: StopSkillParams): Promise<StopSkillResult> {
  if (!checkJSAPI()) {
    console.warn('JSAPI 不可用，使用 mock 响应');
    return {
      status: 'success',
    };
  }

  try {
    const result = await window.HWH5!.stopSkill(params);
    return result;
  } catch (error: any) {
    console.error('停止技能失败:', error);
    throw error;
  }
}

/**
 * 发送消息到 IM
 */
export async function sendMessageToIM(
  params: SendMessageToIMParams
): Promise<SendMessageToIMResult> {
  if (!checkJSAPI()) {
    console.warn('JSAPI 不可用，使用 mock 响应');
    return {
      success: true,
      chatId: 'mock-chat-id',
      contentLength: params.content.length,
    };
  }

  try {
    const result = await window.HWH5!.sendMessageToIM(params);
    return result;
  } catch (error: any) {
    console.error('发送消息到 IM 失败:', error);
    throw error;
  }
}

/**
 * 控制小程序（关闭/最小化）
 */
export async function controlSkillWeCode(
  params: ControlSkillWeCodeParams
): Promise<ControlSkillWeCodeResult> {
  if (!checkJSAPI()) {
    console.warn('JSAPI 不可用，使用 mock 响应');
    return {
      status: 'success',
    };
  }

  try {
    const result = await window.HWH5!.controlSkillWeCode(params);
    return result;
  } catch (error: any) {
    console.error('控制小程序失败:', error);
    throw error;
  }
}

/**
 * 从 URL 参数中获取 sessionId
 */
export function getSessionIdFromURL(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('sessionid') || urlParams.get('sessionId') || null;
}
