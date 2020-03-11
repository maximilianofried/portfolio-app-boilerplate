import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import SlateEditor from '../components/slate-editor/Editor';
import {toast} from 'react-toastify';
import {getBlogById, updateBlog} from '../actions';
class blogEditorUpdate extends React.Component {

    static async getInitialProps({query}) {
        const blogId = query.id;
        let blog = {};

        try {
            blog = await getBlogById(blogId);
        } catch(err) {
            //return(err);
            console.error(err);
        }

        return {blog};
    }

    constructor(props){
        super(props);

        this.state = {
            isSaving: false
        }
       this.updateBlog = this.updateBlog.bind(this);
    }

    updateBlog(story, heading) {
        const {blog} = this.props;
        const updatedBlog = {};
        updatedBlog.title = heading.title;
        updatedBlog.subTitle = heading.subtitle;
        updatedBlog.story = story;
        this.setState({isSaving: true});

        updateBlog(updatedBlog, blog._id).then(updatedBlog => {
            this.setState({isSaving: false});
            toast.success('Blog Saved Succesfuly!');
        }).catch(err => {
            this.setState({isSaving: false});
            const message = err.message || 'Server Error!';
            toast.error('Unexpected Error, copy your process and refresh browser!');
            console.error(message);
        })
    }

    render() {
        const {blog} = this.props;
        const {isSaving} = this.state;

        return (
            <BaseLayout {...this.props.auth}>
                <BasePage containerClass="editor-wrapper" className="blog-editor-page">
                    <SlateEditor initialValue={blog.story} isLoading={isSaving} save={this.updateBlog}/>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth('siteOwner')(blogEditorUpdate);
