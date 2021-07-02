export enum EVENTS{
  INIT = "init",
  FLOW_CDM = "flow:component-did-mount",
  FLOW_CDU = "flow:component-did-update",
  FLOW_CWU = "flow:component-will-unmount",
  FLOW_RENDER = "flow:render",
  FLOW_HANDLER = "handler",
  PUT_STORE = "put-store",
  OPEN_SOCKET = "flow:open-socket",
  CLOSE_SOCKET = "flow:close-socket",
  MESSAGE_SOKET = "flow:message-socket",
  ERROR_SOCKET = "flow:error-socket"
}
