import Icons from "@/components/icons";
import { toast } from "react-toastify";

class Toast {
	success(message: string = "") {
		toast.success(message, {
			icon: (
				<div className='w-6 h-6'>
					<Icons.CheckIcon />
				</div>
			),
		});
	}
	error(message: string = "") {
		toast.error(message, {
			icon: (
				<div className='w-6 h-6'>
					<Icons.ErrorIcon />
				</div>
			),
		});
	}
	info(message: string = "") {
		toast.info(message, {
			icon: (
				<div className='w-6 h-6'>
					<Icons.InfoIcon />
				</div>
			),
		});
	}
	warning(message: string = "") {
		toast.warning(message, {
			icon: (
				<div className='w-6 h-6'>
					<Icons.WarningIcon />
				</div>
			),
		});
	}
}

const qualiToast = new Toast();

export { qualiToast };
