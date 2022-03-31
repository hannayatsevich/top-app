import styles from './ReviewForm.module.css';
import classnames from "classnames";
import {ReviewFormProps} from "./ReviewForm.props";
import {Button, Input, Rating, Textarea} from "../../../components";
import CloseIcon from '../../../public/help-icons/close.svg';
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {IReviewForm, IReviewResponse} from "./ReviewForm.interface";
import axios from "axios";
import {API} from "../../../helpers/api";

export const ReviewForm = ({productId, className, ...props}: ReviewFormProps):JSX.Element => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const {register, control, handleSubmit, formState: {errors}, reset} = useForm<IReviewForm>();

    const onSubmit = async (formData: IReviewForm): Promise<void> => {
        try {
            const {data} = await axios.post<IReviewResponse>(API.review.createDemo, {...formData, productId});
            if(data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError('Что-то пошло не так');
            }
        }
        catch (e) {
            setError('Что-то пошло не так');
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classnames(className, styles['review-form'])} {...props}>
                <Input
                    className={styles['input-name']}
                    placeholder={'Имя'}
                    {...register('name', {
                        required: {value: true, message: 'Заполните имя'}
                    })}
                    error={errors.name}
                />
                <Input
                    className={styles['input-title']}
                    placeholder={'Заголовок отзыва'}
                    {...register('title', {
                        required: {value: true, message: 'Заполните заголовок'}
                    })}
                    error={errors.title}
                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        name={'rating'}
                        rules={{required: {value: true, message: 'Укажите рейтинг'}}}
                        render={({field}):JSX.Element => <Rating
                            rating={field.value}
                            isEditable={true}
                            setRating={field.onChange}
                            ref={field.ref}
                            error={errors.rating}
                        />}
                    />

                </div>
                <Textarea
                    className={styles['review-text']}
                    placeholder={'Текст отзыва'}
                    {...register('description', {
                        required: {value: true, message: 'Заполните описание'}
                    })}
                    error={errors.description}
                />
                <div className={styles.submit}>
                    <Button>Отправить</Button>
                    <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            { isSuccess &&
                <div className={classnames(styles.panel, styles.success)}>
                    <div className={styles['success-text']}>Ваш отзыв отправлен.</div>
                    <div className={styles['success-description']}>Спасибо, ваш отзыв будет опубликован после проверки отзыв отправлен.</div>
                    <CloseIcon className={classnames(styles.close, styles['success-close'])} onClick={():void => setIsSuccess(false)}/>
                </div>
            }
            { error &&
                <div className={classnames(styles.panel, styles.error)}>
                    <div className={styles['error-text']}>{error}</div>
                    <CloseIcon className={classnames(styles.close, styles['error-close'])} onClick={():void => setError('')}/>
                </div>
            }
        </form>
    );
};