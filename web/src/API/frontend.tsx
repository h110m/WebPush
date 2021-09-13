export interface ISubscription {
  id: string;
}

export default class WebPush {
  private PublicKey: string = "";
  public init = async (publicKey: string): Promise<ISubscription | false> => {
    this.PublicKey = publicKey;
    if (
      !navigator.serviceWorker ||
      !window.PushManager ||
      Notification.permission !== "granted"
    )
      return false;

    if ("serviceWorker" in navigator && "PushManager" in window) {
      if (Notification.permission !== "granted") return false;
      return await this.register();
    } else {
      console.warn("WebPush not supported!");
      return false;
    }
  };

  public register = async (): Promise<ISubscription | false> => {
    if (
      Notification.permission !== "granted" &&
      (await Notification.requestPermission()) !== "granted"
    )
      return false;
    navigator.serviceWorker.register("/sw.js", { scope: "/" });
    var sw = await navigator.serviceWorker.ready;
    var sub = await sw.pushManager.getSubscription();
    if (!sub) {
      sub = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.PublicKey,
      });
    }
    var rsp = await fetch("/sub", {
      method: "POST",
      credentials: "omit",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(sub),
    });
    if (rsp.status !== 201) return false;
    return await rsp.json();
  };
}
