export class Base64Util {
  /**
   * Base64文字列が有効かどうかを判定
   * データURLか通常のBase64かを判断し、適切に処理する
   */
  public static isValidBase64(str: string): boolean {
    // データURLの場合はプレフィックスを確認
    if (str.startsWith("data:image/")) {
      const base64Part = str.split(",")[1];
      return !!base64Part;
    }

    // 通常のBase64文字列の場合は文字セットを確認
    try {
      return /^[A-Za-z0-9+/=]+$/.test(str);
    } catch {
      return false;
    }
  }

  /**
   * Base64文字列をArrayBufferに変換
   */
  public static base64ToArrayBuffer(base64: string): ArrayBuffer {
    // データURLの場合は、Base64部分のみを抽出
    let base64Data = base64;
    if (base64.startsWith("data:")) {
      base64Data = base64.split(",")[1];
    }

    // Base64からバイナリデータへの変換
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  /**
   * ArrayBufferをBase64に変換
   */
  public static arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
}
