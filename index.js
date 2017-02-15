
import { NativeModules } from 'react-native';

const { FPStaticServer } = NativeModules;

const PORT = "9999";
const ROOT = "";
const LOCALHOST = 'http://127.0.0.1:';

class StaticServer {
	constructor(port, root, opts) {
		switch (arguments.length) {
			case 3:
				this.port = `${port}` || PORT;
				this.root = root || ROOT;
				this.localOnly = (opts && opts.localOnly) || false;
				break;
			case 2:
				this.port = `${port}`;
				if (typeof(arguments[1]) === 'string') {
					this.root = root;
					this.localOnly = false;
				} else {
					this.root = ROOT;
					this.localOnly = (arguments[1] && arguments[1].localOnly) || false;
				}
				break;
			case 1:
				if (typeof(arguments[0]) === 'number') {
					this.port = `${port}`;
					this.root = ROOT;
					this.localOnly = false;
				} else {
					this.port = PORT;
					this.root = ROOT;
					this.localOnly = (arguments[0] && arguments[0].localOnly) || false;
				}
				break;
			default:
				this.port = PORT;
				this.root = ROOT;
				this.localOnly = false;
		}


		this.started = false;
	}

	start() {
		if( this.started ){
			console.warn('StaticServer already running');
		}
		this.port = this.port;
		this.origin = LOCALHOST + this.port;

		this.started = true;

		return FPStaticServer.start(this.port, this.root, this.localOnly);
	}

	stop() {
		if( !this.started ){
			console.warn('StaticServer not running');
		}

		this.started = false;

		return FPStaticServer.stop();
	}
}
export default StaticServer;